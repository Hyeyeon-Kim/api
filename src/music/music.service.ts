// src/music/music.service.ts

import { Injectable, BadRequestException } from "@nestjs/common";
import { Types } from "mongoose"; // ← Mongoose ObjectId를 쓸 경우
import axios from "axios";
import { DiaryService } from "src/diary/diary.service";
import { ResponseTotalMoodDto } from "src/diary/dto/response-diary.dto";

interface TrackInfo {
  artist: string;
  title: string;
  score: number;
  preview_url?: string | null;
  cover?: string | null;
}

@Injectable()
export class MusicService {
  constructor(private readonly diaryService: DiaryService) {}

  // 기분을 Last.fm 태그로 매핑
  private readonly moodToLastfmTags: Record<string, string[]> = {
    행복: ["happy", "upbeat", "dance"],
    슬픔: ["sad", "blues", "melancholy"],
    분노: ["angry", "hardcore", "metal"],
    중립: ["indie", "alternative", "chill"],
    놀람: ["surprise", "energetic", "edm"],
    공포: ["dark", "ambient", "gothic"],
  };

  /**
   * Last.fm “tag.getTopTracks” 호출
   * @param tag 조회할 태그 (예: "happy" 등)
   * @param limit 한 번에 가져올 트랙 개수
   */
  private async getTracksByTag(
    tag: string,
    limit: number
  ): Promise<{ artist: string; title: string }[]> {
    const API_KEY = process.env.LASTFM_API_KEY;
    if (!API_KEY) {
      throw new BadRequestException("LASTFM_API_KEY가 설정되어 있지 않습니다.");
    }

    try {
      const res = await axios.get("http://ws.audioscrobbler.com/2.0/", {
        params: {
          method: "tag.gettoptracks",
          tag,
          api_key: API_KEY,
          format: "json",
          limit,
        },
        timeout: 10000,
      });
      const list = (res.data.tracks?.track as any[]) || [];
      return list.map((t) => ({
        artist: (t.artist?.name as string) || "Unknown",
        title: (t.name as string) || "Unknown",
      }));
    } catch (err) {
      console.warn(
        `Last.fm 태그 조회 실패 (tag=${tag}): ${(err as any)?.message}`
      );
      return [];
    }
  }

  /**
   * Deezer Search API를 통해 artist/title 조합으로 첫 번째 결과 트랙의
   * preview URL(30초 미리 듣기)과 앨범 커버 이미지를 가져옵니다.
   */
  private async fetchDeezerPreviewAndCover(
    artist: string,
    title: string
  ): Promise<{ preview_url: string | null; cover: string | null }> {
    try {
      const query = encodeURIComponent(`${artist} ${title}`);
      const res = await axios.get("https://api.deezer.com/search", {
        params: { q: query, limit: 1 },
        timeout: 10000,
      });
      const data = res.data.data as any[];
      if (!Array.isArray(data) || data.length === 0) {
        return { preview_url: null, cover: null };
      }
      const track = data[0];
      return {
        preview_url: track.preview || null,
        cover: track.album?.cover_medium || null,
      };
    } catch (err) {
      console.warn(
        `Deezer 검색 실패 (artist="${artist}", title="${title}"): ${
          (err as any)?.message
        }`
      );
      return { preview_url: null, cover: null };
    }
  }

  /**
   * 기분 기반 추천 + Deezer preview/cover 병합 로직
   * @param limit 최종 추천받을 곡 개수 (기본 20)
   * @param userId 사용자의 ObjectId
   */
  public async recommendByMood(limit = 20, userId: Types.ObjectId) {
    // 1) DiaryService를 통해 사용자의 기분 통계 가져오기
    const moodsDto: ResponseTotalMoodDto =
      await this.diaryService.getTotal(userId);
    const moods = moodsDto.moods; // [{ mood: string; cnt: number; ratio: number }, ...]

    if (!Array.isArray(moods) || moods.length === 0) {
      throw new BadRequestException(
        "사용자의 기분 데이터를 가져올 수 없습니다."
      );
    }

    // 2) 가장 빈도 높은 기분 객체 추출 (cnt 기준)
    let highest = moods[0];
    for (const item of moods) {
      if (item.cnt > highest.cnt) {
        highest = item;
      }
    }

    // 3) primaryMoodName을 문자열로 가져오기
    let primaryMoodName = highest.mood;

    // 4) 만약 빈 문자열이거나, moodToLastfmTags에 없으면 "행복"으로 디폴트
    if (
      !primaryMoodName ||
      typeof primaryMoodName !== "string" ||
      !this.moodToLastfmTags[primaryMoodName]
    ) {
      primaryMoodName = "행복";
    }

    // 5) 해당 기분에 매핑된 태그 배열 가져오기
    const tags = this.moodToLastfmTags[primaryMoodName];
    const songMap = new Map<string, TrackInfo>();

    // 6) Last.fm 태그별 Top N 곡 수집 → 점수(score) 누적
    for (const tag of tags) {
      const topList = await this.getTracksByTag(tag, limit);
      topList.forEach((item, idx) => {
        const score = limit - idx; // 인덱스가 낮을수록 점수 높게
        const key = `${item.artist} - ${item.title}`;
        if (songMap.has(key)) {
          const existing = songMap.get(key)!;
          existing.score += score;
        } else {
          songMap.set(key, {
            artist: item.artist,
            title: item.title,
            score,
          });
        }
      });
    }

    // 7) 점수 내림차순 정렬 → 상위 limit개 선택
    const sorted = Array.from(songMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // 8) 상위 limit개 곡에 대해 Deezer로 preview_url, cover 조회
    const recommendationsWithPreview = await Promise.all(
      sorted.map(async (item) => {
        const { preview_url, cover } = await this.fetchDeezerPreviewAndCover(
          item.artist,
          item.title
        );
        return {
          artist: item.artist,
          title: item.title,
          preview_url,
          cover,
          score: item.score,
        };
      })
    );

    return {
      moodTags: tags,
      primaryMood: primaryMoodName,
      recommendations: recommendationsWithPreview,
    };
  }
}
