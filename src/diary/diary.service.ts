import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Diary, DiaryInfo } from "./entities/diary.schema";
import { Model, Types } from "mongoose";
import {
  ResponseCalendarDto,
  ResponseDiariesDto,
  ResponseDiaryDto,
  ResponseWeeklyDto,
} from "./dto/response-diary.dto";
import {
  DiaryNotFoundException,
  UserDiaryNotFoundException,
} from "./exceptions/diary-not-found";
import moment from "moment-timezone";
import { TmpService } from "src/tmp/tmp.service";

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name) private readonly diaryModel: Model<Diary>,
    private readonly genai: TmpService
  ) {}

  async create(userId: Types.ObjectId, diaryInfo: DiaryInfo) {
    const diary = await this.diaryModel.create({
      writer: userId, // uid를 추가하여 사용자와 연결
      title: diaryInfo.title,
      content: diaryInfo.content,
      day: diaryInfo.day,
    });

    const prompt = `
    아래 지시사항을 정확히 따라 글의 감정을 분석해주세요.
    ■ 감정 카테고리 (반드시 아래 6개 중에서만 선택)
    - 놀람
    - 슬픔
    - 중립
    - 행복
    - 분노
    - 공포

    ■ 출력 형식
    - JSON 배열: ["감정1", "감정2", …]
    - 해당 카테고리에 맞는 감정이 없거나, 제목·본문이 비어 있거나 “ㅇㄴㅇㄴㅇ” 같은 대체 텍스트만 있으면 빈 배열: []
    - **출력 결과에는 어떠한 개행문자(\\n)나 공백도 포함하지 않고, 정확히 배열 문자만 출력할 것.**

    ■ 금지 사항
    - 감정 외 다른 텍스트나 설명을 하지 말 것.
    - 배열 외의 포맷(문장, 표 등) 사용 금지.
    

    ---
    Title: ${diaryInfo.title}
    Content: ${diaryInfo.content}
    `.trim();

    const aiReply = await this.genai.generateText(prompt);

    diary.modes = aiReply;
    diary.save();
  }

  async getAll(userId: Types.ObjectId) {
    const diaries = await this.diaryModel
      .find({ writer: userId })
      .sort({ createdAt: -1 })
      .exec();

    if (!diaries || diaries.length === 0) {
      throw new UserDiaryNotFoundException(userId);
    }

    const diaryDtos = diaries.map(
      (d) =>
        new ResponseDiaryDto({
          _id: d._id,
          title: d.title,
          content: d.content,
          modes: d.modes,
          createdAt: d.createdAt,
        })
    );

    return new ResponseDiariesDto(diaryDtos);
  }

  async getOne(diaryId: Types.ObjectId) {
    const diary = await this.diaryModel.findById(diaryId).exec();
    if (!diary) {
      throw new DiaryNotFoundException(diaryId);
    }
    return new ResponseDiaryDto(diary);
  }

  async deleteDiary(userId: Types.ObjectId, diaryId: Types.ObjectId) {
    const diary = await this.diaryModel.findById(diaryId).exec();
    if (!diary) {
      throw new DiaryNotFoundException(diaryId);
    }
    if (diary.writer.toString() !== userId.toString()) {
      throw new ForbiddenException();
    }

    await diary.deleteOne();
  }

  async updateDiary(
    userId: Types.ObjectId,
    diaryId: Types.ObjectId,
    diaryInfo: Partial<DiaryInfo>
  ) {
    const diary = await this.diaryModel.findById(diaryId).exec();
    if (!diary) {
      throw new DiaryNotFoundException(diaryId);
    }
    if (diary.writer.toString() !== userId.toString()) {
      throw new ForbiddenException();
    }

    await this.diaryModel.updateOne(
      { _id: diaryId },
      {
        $set: {
          title: diaryInfo.title,
          content: diaryInfo.content,
          day: diaryInfo.day,
        },
      }
    );
  }

  async getWeekly(userId: Types.ObjectId) {
    const now = moment.tz("Asia/Seoul");

    const startOfWeek = now.clone().startOf("isoWeek").startOf("day").toDate();
    const endOfWeek = now.clone().endOf("isoWeek").endOf("day").toDate();

    const diaries = await this.diaryModel
      .find({
        writer: userId,
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
      })
      .sort({ createdAt: -1 })
      .exec();

    const map = new Map<string, number>();
    diaries.forEach((d) => {
      d.modes.forEach((mood) => {
        map.set(mood, (map.get(mood) || 0) + 1);
      });
    });
    const summaryData = Array.from(map.entries()).map(([mood, cnt]) => ({
      mood,
      cnt,
    }));

    return new ResponseWeeklyDto(summaryData);
  }

  async getCalendar(userId: Types.ObjectId) {
    const now = moment.tz("Asia/Seoul");

    const startOfMonth = now.clone().startOf("month").startOf("day").toDate();
    const endOfMonth = now.clone().endOf("month").endOf("day").toDate();

    const diaries = await this.diaryModel
      .find({
        writer: userId,
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      })
      .sort({ createdAt: -1 })
      .exec();

    const summaryData = diaries.map((d) => {
      const dt = moment(d.createdAt).tz("Asia/Seoul");
      return {
        year: dt.year(),
        month: dt.month() + 1,
        date: dt.format("YYYY-MM-DD"),
        mood: d.modes[0] ?? "",
        id: d._id.toString(),
      };
    });

    return new ResponseCalendarDto(summaryData);
  }
}
