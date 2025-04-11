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
exports.UserInfo = exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let User = class User {
    id;
    uid;
    status;
    email;
    user_name;
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID(monogodb)',
        example: '60f6e4b0b5b4b4001f9f4f5b',
        type: String,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], User.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, swagger_1.ApiProperty)({
        example: 'google-oauth2|123456789012345678901',
        description: 'User ID(firebase)',
    }),
    __metadata("design:type", String)
], User.prototype, "uid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '활동중' }),
    (0, swagger_1.ApiProperty)({
        example: '활동중',
        description: 'User 상태',
    }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({
        example: 'asdf@gmail.com',
        description: 'User email',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    (0, swagger_1.ApiProperty)({
        example: '홍길동',
        description: 'User 이름',
    }),
    __metadata("design:type", String)
], User.prototype, "user_name", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
class UserInfo extends (0, swagger_1.PickType)(User, ['email', 'user_name']) {
    constructor(partial) {
        super();
        this.email = partial.email;
        this.user_name = partial.user_name;
    }
}
exports.UserInfo = UserInfo;
//# sourceMappingURL=user.schema.js.map