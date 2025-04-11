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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseAuthStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const passport_firebase_jwt_1 = require("passport-firebase-jwt");
const firebase_admin_1 = require("firebase-admin");
const user_service_1 = require("../../user/user.service");
const core_1 = require("@nestjs/core");
let FirebaseAuthStrategy = class FirebaseAuthStrategy extends (0, passport_1.PassportStrategy)(passport_firebase_jwt_1.Strategy, 'firebase-auth') {
    reflector;
    userservice;
    constructor(reflector, userservice) {
        super({
            jwtFromRequest: passport_firebase_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this.reflector = reflector;
        this.userservice = userservice;
    }
    async validate(token) {
        if (process.env.NODE_ENV === 'test' ||
            process.env.NODE_ENV === 'development') {
            return await this.userservice.findOneByFirebase('test');
        }
        const firebaseUser = await (0, firebase_admin_1.auth)()
            .verifyIdToken(token, true)
            .catch((err) => {
            throw new common_1.UnauthorizedException(err.message);
        });
        return await this.userservice.findOneByFirebase(firebaseUser.uid);
    }
};
exports.FirebaseAuthStrategy = FirebaseAuthStrategy;
exports.FirebaseAuthStrategy = FirebaseAuthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_service_1.UserService])
], FirebaseAuthStrategy);
//# sourceMappingURL=firebase-auth.stategies.js.map