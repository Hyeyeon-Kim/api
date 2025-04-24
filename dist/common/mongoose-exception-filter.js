"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
let MongooseExceptionFilter = class MongooseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(500).json({
            statusCode: 500,
            message: process.env.NODE_ENV === 'production'
                ? 'Internal Server Error'
                : exception.message,
        });
    }
};
exports.MongooseExceptionFilter = MongooseExceptionFilter;
exports.MongooseExceptionFilter = MongooseExceptionFilter = __decorate([
    (0, common_1.Catch)(mongodb_1.MongoError, mongoose_1.MongooseError)
], MongooseExceptionFilter);
//# sourceMappingURL=mongoose-exception-filter.js.map