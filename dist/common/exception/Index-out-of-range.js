"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexOutOfRangeException = void 0;
const common_1 = require("@nestjs/common");
const custom_exception_1 = require("./custom-exception");
class IndexOutOfRangeException extends custom_exception_1.CustomException {
    constructor(preidx, nextidx, length) {
        super(` 'preidx'(${preidx}) 또는 'nextidx'(${nextidx})가 범위를 벗어났습니다. 0 - ${length - 1}사이의 값을 입력해주세요.`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.IndexOutOfRangeException = IndexOutOfRangeException;
//# sourceMappingURL=Index-out-of-range.js.map