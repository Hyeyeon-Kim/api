import { DiaryService } from "./diary.service";
import IUser from "src/user/interfaces/user.interface";
import { ResponseCalendarDto, ResponseDiaryDto, ResponseWeeklyDto } from "./dto/response-diary.dto";
import { Types } from "mongoose";
import { DiaryInfo } from "./entities/diary.schema";
export declare class DiaryController {
    private readonly diaryService;
    constructor(diaryService: DiaryService);
    creatediary(userDto: IUser, data: DiaryInfo): Promise<string>;
    getWeekly(userDto: IUser): Promise<ResponseWeeklyDto>;
    getCalendar(userDto: IUser): Promise<ResponseCalendarDto>;
    getDiary(diaryId: Types.ObjectId): Promise<ResponseDiaryDto>;
    deleteDiary(userDto: IUser, diaryId: Types.ObjectId): Promise<void>;
    updateDiary(userDto: IUser, diaryId: Types.ObjectId, data: Partial<DiaryInfo>): Promise<void>;
}
