import { Diary, DiaryInfo } from "./entities/diary.schema";
import { Model, Types } from "mongoose";
import { ResponseCalendarDto, ResponseDiaryDto, ResponseWeeklyDto } from "./dto/response-diary.dto";
export declare class DiaryService {
    private readonly diaryModel;
    constructor(diaryModel: Model<Diary>);
    create(userId: Types.ObjectId, diaryInfo: DiaryInfo): Promise<string>;
    getOne(diaryId: Types.ObjectId): Promise<ResponseDiaryDto>;
    deleteDiary(userId: Types.ObjectId, diaryId: Types.ObjectId): Promise<void>;
    updateDiary(userId: Types.ObjectId, diaryId: Types.ObjectId, diaryInfo: Partial<DiaryInfo>): Promise<void>;
    getWeekly(userId: Types.ObjectId): Promise<ResponseWeeklyDto>;
    getCalendar(userId: Types.ObjectId): Promise<ResponseCalendarDto>;
}
