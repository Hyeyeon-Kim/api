import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Diary, DiaryInfo } from "./entities/diary.schema";
import { Model, Types } from "mongoose";
import {
  ResponseCalendarDto,
  ResponseDiaryDto,
  ResponseWeeklyDto,
} from "./dto/response-diary.dto";
import { DiaryNotFoundException } from "./exceptions/diary-not-found";
import moment from "moment-timezone";

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name) private readonly diaryModel: Model<Diary>,
  ) {}

  async create(userId: Types.ObjectId, diaryInfo: DiaryInfo) {
    const response = await this.diaryModel.create({
      writer: userId, // uid를 추가하여 사용자와 연결
      title: diaryInfo.title,
      content: diaryInfo.content,
      day: diaryInfo.day,
    });
    return response.id as string;
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
    diaryInfo: Partial<DiaryInfo>,
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
      },
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
