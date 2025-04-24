"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringToObjectIdPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let StringToObjectIdPipe = class StringToObjectIdPipe {
    transform(value, metadata) {
        if (!value || typeof value !== 'string') {
            throw new common_1.BadRequestException('Validation failed');
        }
        try {
            return new mongoose_1.Types.ObjectId(value);
        }
        catch (error) {
            throw new common_1.BadRequestException('Validation failed');
        }
    }
};
exports.StringToObjectIdPipe = StringToObjectIdPipe;
exports.StringToObjectIdPipe = StringToObjectIdPipe = __decorate([
    (0, common_1.Injectable)()
], StringToObjectIdPipe);
//# sourceMappingURL=string-to-objectId-pipe.js.map