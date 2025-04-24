"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundException = void 0;
const common_1 = require("@nestjs/common");
const custom_exception_1 = require("../../common/exception/custom-exception");
class UserNotFoundException extends custom_exception_1.CustomException {
    constructor(id) {
        super(`id(${id})로 유저정보를 찾을 수 없습니다.`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=user-not-found.js.map