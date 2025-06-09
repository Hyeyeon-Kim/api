import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Diary, DiaryInfo } from "./entities/diary.schema";
import { Model, Types } from "mongoose";
import {
  ResponseCalendarDto,
  ResponseDiariesDto,
  ResponseDiaryDto,
  ResponseTotalMoodDto,
  ResponseWeeklyDto,
} from "./dto/response-diary.dto";
import {
  DiaryNotFoundException,
  UserDiaryNotFoundException,
} from "./exceptions/diary-not-found";
import moment from "moment-timezone";
import { UploadService } from "src/upload/upload.service";
import axios from "axios";

@Injectable()
export class DiaryService {
  private readonly EMOTION_API_URL =
    "https://6byhfli5tacbf65upmhkwg3bx40rewah.lambda-url.us-east-2.on.aws/";

  constructor(
    @InjectModel(Diary.name) private readonly diaryModel: Model<Diary>,
    private readonly uploadService: UploadService
  ) {}

  async createWithStt(userId: Types.ObjectId, file) {
    const diary = await this.diaryModel.create({
      writer: userId,
    });

    const path = userId.toString() + "/" + diary.id;
    const updatedata = await this.uploadService.create(path, file);
  }

  async create(userId: Types.ObjectId, diaryInfo: DiaryInfo) {
    const diary = await this.diaryModel.create({
      writer: userId, // uid를 추가하여 사용자와 연결
      title: diaryInfo.title,
      content: diaryInfo.content,
      day: diaryInfo.day,
    });

    try {
      // 2) Lambda에 text 필드로 content 전송
      const resp = await axios.post(this.EMOTION_API_URL, {
        text: diaryInfo.content,
      });

      // 3) predictedEmotion 추출
      const { predictedEmotion } = resp.data;
      if (!predictedEmotion) {
        throw new Error("predictedEmotion이 응답에 없습니다.");
      }

      // 4) Mongoose 다큐먼트에 modes로 저장
      diary.modes = predictedEmotion;
      await diary.save();

      return diary;
    } catch (err) {
      // 에러 시 로깅 및 예외 처리
      console.error("Emotion API 호출 오류:", err);
      throw new BadRequestException("감정 분석에 실패했습니다.");
    }
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

  async getTotal(userId: Types.ObjectId) {
    const diaries = await this.diaryModel
      .find({ writer: userId })
      .sort({ createdAt: -1 })
      .exec();

    const map = new Map<string, number>();
    let totalCount = 0;

    diaries.forEach((d) => {
      d.modes.forEach((mood) => {
        map.set(mood, (map.get(mood) || 0) + 1);
        totalCount += 1;
      });
    });

    const summaryData = Array.from(map.entries()).map(([mood, cnt]) => ({
      mood,
      cnt,
      ratio: Number(((cnt / totalCount) * 100).toFixed(2)),
    }));

    return new ResponseTotalMoodDto(summaryData, totalCount);
  }
}
