"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPreIndexException = void 0;
const common_1 = require("@nestjs/common");
const custom_exception_1 = require("./custom-exception");
class InvalidPreIndexException extends custom_exception_1.CustomException {
    constructor(preidx, id) {
        super(` 'preidx'(${preidx})와 'id'(${id})가 일치하지 않습니다`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InvalidPreIndexException = InvalidPreIndexException;
//# sourceMappingURL=Invalid-pre-index.js.map