"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const user_module_1 = require("../user/user.module");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const firebase_auth_stategies_1 = require("./stategies/firebase-auth.stategies");
const firebase_auth_guard_1 = require("./guard/firebase-auth.guard");
const core_1 = require("@nestjs/core");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => user_module_1.UserModule), passport_1.PassportModule],
        controllers: [],
        providers: [
            firebase_auth_stategies_1.FirebaseAuthStrategy,
            {
                provide: core_1.APP_GUARD,
                useClass: firebase_auth_guard_1.FirebaseAuthGuard,
            },
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map