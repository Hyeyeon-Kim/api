"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryNotFoundException = void 0;
const common_1 = require("@nestjs/common");
const custom_exception_1 = require("../../common/exception/custom-exception");
class DiaryNotFoundException extends custom_exception_1.CustomException {
    constructor(id) {
        super(`id(${id.toString()})로 만든 일기가 존재하지 않습니다`, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.DiaryNotFoundException = DiaryNotFoundException;
//# sourceMappingURL=diary-not-found.js.map