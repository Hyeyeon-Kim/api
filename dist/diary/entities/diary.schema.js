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
exports.DiaryInfo = exports.DiarySchema = exports.Diary = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const mongoose_2 = require("mongoose");
let Diary = class Diary {
    title;
    content;
    day;
    writer;
    modes;
    createdAt;
    updatedAt;
};
exports.Diary = Diary;
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], Diary.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], Diary.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: "" }),
    __metadata("design:type", String)
], Diary.prototype, "day", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.SchemaTypes.ObjectId, ref: "User" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Diary.prototype, "writer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: "" }),
    __metadata("design:type", Array)
], Diary.prototype, "modes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Diary.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], Diary.prototype, "updatedAt", void 0);
exports.Diary = Diary = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], Diary);
exports.DiarySchema = mongoose_1.SchemaFactory.createForClass(Diary);
class DiaryInfo extends (0, swagger_1.PickType)(Diary, ["title", "content", "day"]) {
    constructor(partial) {
        super();
        this.title = partial.title;
        this.content = partial.content;
        this.day = partial.day;
    }
}
exports.DiaryInfo = DiaryInfo;
//# sourceMappingURL=diary.schema.js.map