"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlredyJoinedException = void 0;
const common_1 = require("@nestjs/common");
const custom_exception_1 = require("../../common/exception/custom-exception");
class UserAlredyJoinedException extends custom_exception_1.CustomException {
    constructor(id) {
        super(`이미 가입된 회원입니다 (${id}).`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.UserAlredyJoinedException = UserAlredyJoinedException;
//# sourceMappingURL=user-already-joined.exception.js.map