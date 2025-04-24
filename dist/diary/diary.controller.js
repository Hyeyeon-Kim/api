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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const diary_service_1 = require("./diary.service");
const get_user_decorator_1 = require("../user/decorators/get-user.decorator");
const response_diary_dto_1 = require("./dto/response-diary.dto");
const mongoose_1 = require("mongoose");
const string_to_objectId_pipe_1 = require("../common/string-to-objectId-pipe");
const diary_schema_1 = require("./entities/diary.schema");
let DiaryController = class DiaryController {
    diaryService;
    constructor(diaryService) {
        this.diaryService = diaryService;
    }
    creatediary(userDto, data) {
        return this.diaryService.create(userDto.id, data);
    }
    getWeekly(userDto) {
        return this.diaryService.getWeekly(userDto.id);
    }
    getCalendar(userDto) {
        return this.diaryService.getCalendar(userDto.id);
    }
    getDiary(diaryId) {
        return this.diaryService.getOne(diaryId);
    }
    deleteDiary(userDto, diaryId) {
        return this.diaryService.deleteDiary(userDto.id, diaryId);
    }
    updateDiary(userDto, diaryId, data) {
        return this.diaryService.updateDiary(userDto.id, diaryId, data);
    }
};
exports.DiaryController = DiaryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "다어어리 생성" }),
    (0, swagger_1.ApiCreatedResponse)({ description: "다어어리 생성", type: String }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, diary_schema_1.DiaryInfo]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "creatediary", null);
__decorate([
    (0, common_1.Get)("/weekly"),
    (0, swagger_1.ApiOperation)({ summary: "주 단위의 감정 수치 보여주기 " }),
    (0, swagger_1.ApiOkResponse)({
        description: "주 단위의 감정 수치 보여주기 ",
        type: response_diary_dto_1.ResponseWeeklyDto,
    }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "getWeekly", null);
__decorate([
    (0, common_1.Get)("/calendar"),
    (0, swagger_1.ApiOperation)({ summary: "한 달 주요 감정 보여주기 " }),
    (0, swagger_1.ApiOkResponse)({
        description: "한 달 주요 감정 보여주기 ",
        type: response_diary_dto_1.ResponseCalendarDto,
    }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "getCalendar", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "다어어리 조회" }),
    (0, swagger_1.ApiOkResponse)({ description: "다어어리 조회", type: response_diary_dto_1.ResponseDiaryDto }),
    __param(0, (0, common_1.Param)("id", string_to_objectId_pipe_1.StringToObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "getDiary", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "다어어리 삭제" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "다어어리 ID", type: String }),
    (0, swagger_1.ApiNoContentResponse)({ description: "다어어리 삭제" }),
    (0, swagger_1.ApiForbiddenResponse)({ description: "다른 사용자의 다어어리 삭제 시도" }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "다이어리를 찾을 수 없음" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)("id", string_to_objectId_pipe_1.StringToObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "deleteDiary", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "다어어리 수정" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "다어어리 ID", type: String }),
    (0, swagger_1.ApiNoContentResponse)({ description: "다어어리 수정" }),
    (0, swagger_1.ApiForbiddenResponse)({ description: "다른 사용자의 다어어리 수정 시도" }),
    (0, swagger_1.ApiNotFoundResponse)({ description: "다이어리를 찾을 수 없음" }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)("id", string_to_objectId_pipe_1.StringToObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongoose_1.Types.ObjectId, Object]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "updateDiary", null);
exports.DiaryController = DiaryController = __decorate([
    (0, swagger_1.ApiTags)("Diary"),
    (0, common_1.Controller)("diarys"),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Unauthorized" }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [diary_service_1.DiaryService])
], DiaryController);
//# sourceMappingURL=diary.controller.js.map