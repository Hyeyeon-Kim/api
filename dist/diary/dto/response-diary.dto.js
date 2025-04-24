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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseCalendarDto = exports.ResponseWeeklyDto = exports.SummaryDto = exports.CalendarDayDto = exports.MoodCountDto = exports.ResponseDiaryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ResponseDiaryDto {
    id;
    title;
    content;
    modes;
    createdAt;
    constructor(data) {
        this.id = data._id.toString();
        this.title = data.title;
        this.content = data.content;
        this.modes = data.modes;
        this.createdAt = data.createdAt;
    }
}
exports.ResponseDiaryDto = ResponseDiaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "60a3b9f8d1e6b4f0b0c9c8b1",
        description: "다이어리 ID",
    }),
    __metadata("design:type", String)
], ResponseDiaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "다이어리 제목",
        description: "다이어리 제목",
    }),
    __metadata("design:type", String)
], ResponseDiaryDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "다이어리 내용",
        description: "다이어리 내용",
    }),
    __metadata("design:type", String)
], ResponseDiaryDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ["기분"],
        description: "기분",
    }),
    __metadata("design:type", Array)
], ResponseDiaryDto.prototype, "modes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2023-10-01T12:00:00Z",
        description: "생성일",
    }),
    __metadata("design:type", Date)
], ResponseDiaryDto.prototype, "createdAt", void 0);
class MoodCountDto {
    mood;
    cnt;
    constructor(partial) {
        this.mood = partial.mood;
        this.cnt = partial.cnt;
    }
}
exports.MoodCountDto = MoodCountDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "화남", description: "감정 이름" }),
    __metadata("design:type", String)
], MoodCountDto.prototype, "mood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: "해당 감정 등장 횟수" }),
    __metadata("design:type", Number)
], MoodCountDto.prototype, "cnt", void 0);
class CalendarDayDto {
    year;
    month;
    date;
    mood;
    id;
    constructor(partial) {
        this.year = partial.year;
        this.month = partial.month;
        this.date = partial.date;
        this.mood = partial.mood;
        this.id = partial.id;
    }
}
exports.CalendarDayDto = CalendarDayDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2025, description: "연도" }),
    __metadata("design:type", Number)
], CalendarDayDto.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 9, description: "월 (1~12)" }),
    __metadata("design:type", Number)
], CalendarDayDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2025-09-01", description: "날짜 문자열(ISO)" }),
    __metadata("design:type", String)
], CalendarDayDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "화남", description: "그날의 대표 감정" }),
    __metadata("design:type", String)
], CalendarDayDto.prototype, "mood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "60a3b9f8d1e6b4f0b0c9c8b1",
        description: "해당 날짜 다이어리 ID",
    }),
    __metadata("design:type", String)
], CalendarDayDto.prototype, "id", void 0);
class SummaryDto {
    moods;
    days;
    constructor(partial, type) {
        if (type === "weekly") {
            this.moods = partial.moods;
        }
        else {
            this.days = partial.days;
        }
    }
}
exports.SummaryDto = SummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [MoodCountDto],
        required: false,
        description: "주간 감정별 등장 횟수",
    }),
    __metadata("design:type", Array)
], SummaryDto.prototype, "moods", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [CalendarDayDto],
        required: false,
        description: "월간 주요 날짜 리스트",
    }),
    __metadata("design:type", Array)
], SummaryDto.prototype, "days", void 0);
class ResponseWeeklyDto extends (0, swagger_1.PickType)(SummaryDto, [
    "moods",
]) {
    constructor(data) {
        super();
        const moods = data.map((d) => new MoodCountDto(d));
        const summary = new SummaryDto({ moods }, "weekly");
        Object.assign(this, summary);
    }
}
exports.ResponseWeeklyDto = ResponseWeeklyDto;
class ResponseCalendarDto extends (0, swagger_1.PickType)(SummaryDto, [
    "days",
]) {
    constructor(data) {
        super();
        const days = data.map((d) => new CalendarDayDto(d));
        const summary = new SummaryDto({ days }, "calendar");
        Object.assign(this, summary);
    }
}
exports.ResponseCalendarDto = ResponseCalendarDto;
//# sourceMappingURL=response-diary.dto.js.map