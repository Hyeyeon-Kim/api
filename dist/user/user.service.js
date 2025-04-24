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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./entities/user.schema");
const mongoose_2 = require("mongoose");
const response_user_dto_1 = require("./dtos/response-user.dto");
const user_not_found_1 = require("./exceptions/user-not-found");
const firebase_admin_1 = require("firebase-admin");
const user_already_joined_exception_1 = require("./exceptions/user-already-joined.exception");
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOneByFirebase(userid) {
        const user = await this.userModel
            .findOne({
            uid: userid,
        })
            .catch(() => {
            throw new user_not_found_1.UserNotFoundException(userid);
        });
        if (user == null) {
            throw new user_not_found_1.UserNotFoundException(userid);
        }
        return new response_user_dto_1.UserResponseDto(user);
    }
    async signinForTest() {
        const user = await this.userModel.findOne({
            uid: "test",
        });
        if (user) {
            throw new user_already_joined_exception_1.UserAlredyJoinedException("test");
        }
        await new this.userModel({
            uid: "test",
            email: "test@gmail.com",
            user_name: "test",
            user_image: "https://lh3.googleusercontent.com/a/ACg8ocJQlf3Lsc7V8un9AJSOx7ttgxL5j2Lh49puSWOpQ3xLA6j1ew=s96-c",
        }).save();
    }
    async signin(token) {
        token = token.replace("Bearer ", "");
        const firebaseUser = await (0, firebase_admin_1.auth)()
            .verifyIdToken(token, true)
            .catch((err) => {
            throw new common_1.UnauthorizedException(err.message);
        });
        const user = await this.userModel.findOne({
            uid: firebaseUser.uid,
        });
        if (user) {
            throw new user_already_joined_exception_1.UserAlredyJoinedException(firebaseUser.uid);
        }
        const createdUser = new this.userModel({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            user_name: firebaseUser.name,
        });
        await createdUser.save();
    }
    async deleteUser(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new user_not_found_1.UserNotFoundException(userId.toString());
        }
        await (0, firebase_admin_1.auth)().deleteUser(user.uid);
        await this.userModel.deleteOne({ _id: userId });
    }
    async updateUser(userId, userInfo) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new user_not_found_1.UserNotFoundException(userId.toString());
        }
        await (0, firebase_admin_1.auth)().updateUser(user.uid, {
            displayName: userInfo.user_name,
            email: userInfo.email,
        });
        await this.userModel.updateOne({ _id: userId }, {
            $set: {
                user_name: userInfo.user_name,
                email: userInfo.email,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map