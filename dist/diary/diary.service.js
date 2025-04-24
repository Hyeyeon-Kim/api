"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const diary_schema_1 = require("./entities/diary.schema");
const mongoose_2 = require("mongoose");
const response_diary_dto_1 = require("./dto/response-diary.dto");
const diary_not_found_1 = require("./exceptions/diary-not-found");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
let DiaryService = class DiaryService {
    diaryModel;
    constructor(diaryModel) {
        this.diaryModel = diaryModel;
    }
    async create(userId, diaryInfo) {
        const response = await this.diaryModel.create({
            writer: userId,
            title: diaryInfo.title,
            content: diaryInfo.content,
            day: diaryInfo.day,
        });
        return response.id;
    }
    async getOne(diaryId) {
        const diary = await this.diaryModel.findById(diaryId).exec();
        if (!diary) {
            throw new diary_not_found_1.DiaryNotFoundException(diaryId);
        }
        return new response_diary_dto_1.ResponseDiaryDto(diary);
    }
    async deleteDiary(userId, diaryId) {
        const diary = await this.diaryModel.findById(diaryId).exec();
        if (!diary) {
            throw new diary_not_found_1.DiaryNotFoundException(diaryId);
        }
        if (diary.writer.toString() !== userId.toString()) {
            throw new common_1.ForbiddenException();
        }
        await diary.deleteOne();
    }
    async updateDiary(userId, diaryId, diaryInfo) {
        const diary = await this.diaryModel.findById(diaryId).exec();
        if (!diary) {
            throw new diary_not_found_1.DiaryNotFoundException(diaryId);
        }
        if (diary.writer.toString() !== userId.toString()) {
            throw new common_1.ForbiddenException();
        }
        await this.diaryModel.updateOne({ _id: diaryId }, {
            $set: {
                title: diaryInfo.title,
                content: diaryInfo.content,
                day: diaryInfo.day,
            },
        });
    }
    async getWeekly(userId) {
        const now = moment_timezone_1.default.tz("Asia/Seoul");
        const startOfWeek = now.clone().startOf("isoWeek").startOf("day").toDate();
        const endOfWeek = now.clone().endOf("isoWeek").endOf("day").toDate();
        const diaries = await this.diaryModel
            .find({
            writer: userId,
            createdAt: { $gte: startOfWeek, $lte: endOfWeek },
        })
            .sort({ createdAt: -1 })
            .exec();
        const map = new Map();
        diaries.forEach((d) => {
            d.modes.forEach((mood) => {
                map.set(mood, (map.get(mood) || 0) + 1);
            });
        });
        const summaryData = Array.from(map.entries()).map(([mood, cnt]) => ({
            mood,
            cnt,
        }));
        return new response_diary_dto_1.ResponseWeeklyDto(summaryData);
    }
    async getCalendar(userId) {
        const now = moment_timezone_1.default.tz("Asia/Seoul");
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
            const dt = (0, moment_timezone_1.default)(d.createdAt).tz("Asia/Seoul");
            return {
                year: dt.year(),
                month: dt.month() + 1,
                date: dt.format("YYYY-MM-DD"),
                mood: d.modes[0] ?? "",
                id: d._id.toString(),
            };
        });
        return new response_diary_dto_1.ResponseCalendarDto(summaryData);
    }
};
exports.DiaryService = DiaryService;
exports.DiaryService = DiaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(diary_schema_1.Diary.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DiaryService);
//# sourceMappingURL=diary.service.js.map