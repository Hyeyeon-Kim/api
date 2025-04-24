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
exports.RequestUpdateDiaryModesDto = exports.RequestUpdateDiaryDescriptionDto = exports.RequestUpdateDiaryNameDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdatableDiary {
    title;
    content;
    modes;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "다이어리 제목",
        description: "다이어리 제목",
    }),
    __metadata("design:type", String)
], UpdatableDiary.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "다이어리 내용",
        description: "다이어리 내용",
    }),
    __metadata("design:type", String)
], UpdatableDiary.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ["기분"],
        description: "기분",
    }),
    __metadata("design:type", Array)
], UpdatableDiary.prototype, "modes", void 0);
class RequestUpdateDiaryNameDto extends (0, swagger_1.PickType)(UpdatableDiary, [
    "title",
]) {
}
exports.RequestUpdateDiaryNameDto = RequestUpdateDiaryNameDto;
class RequestUpdateDiaryDescriptionDto extends (0, swagger_1.PickType)(UpdatableDiary, [
    "content",
]) {
}
exports.RequestUpdateDiaryDescriptionDto = RequestUpdateDiaryDescriptionDto;
class RequestUpdateDiaryModesDto extends (0, swagger_1.PickType)(UpdatableDiary, [
    "modes",
]) {
}
exports.RequestUpdateDiaryModesDto = RequestUpdateDiaryModesDto;
//# sourceMappingURL=request-diary.dto.js.map