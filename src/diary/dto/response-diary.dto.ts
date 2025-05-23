import { ApiProperty, PickType } from "@nestjs/swagger";
import { DiaryDocument } from "../entities/diary.schema";

export class ResponseDiaryDto {
  @ApiProperty({
    example: "60a3b9f8d1e6b4f0b0c9c8b1",
    description: "다이어리 ID",
  })
  readonly id: string;

  @ApiProperty({
    example: "다이어리 제목",
    description: "다이어리 제목",
  })
  readonly title: string;

  @ApiProperty({
    example: "다이어리 내용",
    description: "다이어리 내용",
  })
  readonly content: string;

  @ApiProperty({
    example: ["기분"],
    description: "기분",
  })
  readonly modes: string[];

  @ApiProperty({
    example: "2023-10-01T12:00:00Z",
    description: "생성일",
  })
  readonly createdAt: Date;

  constructor(
    data: Pick<
      DiaryDocument,
      "_id" | "title" | "content" | "modes" | "createdAt"
    >
  ) {
    this.id = data._id.toString();
    this.title = data.title;
    this.content = data.content;
    this.modes = data.modes;
    this.createdAt = data.createdAt;
  }
}

export class ResponseDiariesDto {
  @ApiProperty({
    type: [ResponseDiaryDto],
    description: "사용자 다이어리 전체 목록",
  })
  readonly diaries: ResponseDiaryDto[];

  constructor(diaries: ResponseDiaryDto[]) {
    this.diaries = diaries;
  }
}

export class MoodCountDto {
  @ApiProperty({ example: "화남", description: "감정 이름" })
  readonly mood: string;

  @ApiProperty({ example: 3, description: "해당 감정 등장 횟수" })
  readonly cnt: number;

  constructor(partial: { mood: string; cnt: number }) {
    this.mood = partial.mood;
    this.cnt = partial.cnt;
  }
}

export class CalendarDayDto {
  @ApiProperty({ example: 2025, description: "연도" })
  readonly year: number;

  @ApiProperty({ example: 9, description: "월 (1~12)" })
  readonly month: number;

  @ApiProperty({ example: "2025-09-01", description: "날짜 문자열(ISO)" })
  readonly date: string;

  @ApiProperty({ example: "화남", description: "그날의 대표 감정" })
  readonly mood: string;

  @ApiProperty({
    example: "60a3b9f8d1e6b4f0b0c9c8b1",
    description: "해당 날짜 다이어리 ID",
  })
  readonly id: string;

  constructor(partial: {
    year: number;
    month: number;
    date: string;
    mood: string;
    id: string;
  }) {
    this.year = partial.year;
    this.month = partial.month;
    this.date = partial.date;
    this.mood = partial.mood;
    this.id = partial.id;
  }
}

export class SummaryDto {
  @ApiProperty({
    type: [MoodCountDto],
    required: false,
    description: "주간 감정별 등장 횟수",
  })
  readonly moods?: MoodCountDto[];

  @ApiProperty({
    type: [CalendarDayDto],
    required: false,
    description: "월간 주요 날짜 리스트",
  })
  readonly days?: CalendarDayDto[];

  constructor(
    partial: Partial<{
      moods: MoodCountDto[];
      days: CalendarDayDto[];
    }>,
    type: "weekly" | "calendar"
  ) {
    if (type === "weekly") {
      this.moods = partial.moods;
    } else {
      this.days = partial.days;
    }
  }
}

export class ResponseWeeklyDto extends PickType(SummaryDto, [
  "moods",
] as const) {
  constructor(data: { mood: string; cnt: number }[]) {
    super();
    const moods = data.map((d) => new MoodCountDto(d));
    const summary = new SummaryDto({ moods }, "weekly");
    Object.assign(this, summary);
  }
}

export class ResponseCalendarDto extends PickType(SummaryDto, [
  "days",
] as const) {
  constructor(
    data: {
      year: number;
      month: number;
      date: string;
      mood: string;
      id: string;
    }[]
  ) {
    super();
    const days = data.map((d) => new CalendarDayDto(d));
    const summary = new SummaryDto({ days }, "calendar");
    Object.assign(this, summary);
  }
}

export class MoodTotalDto {
  @ApiProperty({ example: "슬픔", description: "감정 이름" })
  readonly mood: string;

  @ApiProperty({ example: 12, description: "감정 등장 횟수" })
  readonly cnt: number;

  @ApiProperty({ example: 35.29, description: "전체 중 이 감정 비율 (%)" })
  readonly ratio: number;

  constructor(partial: { mood: string; cnt: number; ratio: number }) {
    this.mood = partial.mood;
    this.cnt = partial.cnt;
    this.ratio = partial.ratio;
  }
}

export class ResponseTotalMoodDto {
  @ApiProperty({
    type: [MoodTotalDto],
    description: "감정별 등장 횟수 및 비율",
  })
  readonly moods: MoodTotalDto[];

  @ApiProperty({
    example: 34,
    description: "전체 감정 태그 수 (모든 감정 등장 횟수 합)",
  })
  readonly total: number;

  constructor(
    data: { mood: string; cnt: number; ratio: number }[],
    total: number
  ) {
    this.moods = data.map((d) => new MoodTotalDto(d));
    this.total = total;
  }
}
