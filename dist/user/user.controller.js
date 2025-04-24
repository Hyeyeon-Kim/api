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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_user_decorator_1 = require("./decorators/get-user.decorator");
const user_service_1 = require("./user.service");
const public_decorator_1 = require("../common/public.decorator");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    signin(authorization) {
        if (process.env.NODE_ENV === "test") {
            return this.userService.signinForTest();
        }
        return this.userService.signin(authorization);
    }
    update(userDto, data) {
        return this.userService.updateUser(userDto.id, data);
    }
    remove(userDto) {
        return this.userService.deleteUser(userDto.id);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "유저 생성" }),
    (0, swagger_1.ApiCreatedResponse)({ description: "유저 생성" }),
    __param(0, (0, common_1.Headers)("authorization")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update a user by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User updated successfully." }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Delete a user by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User deleted successfully." }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map