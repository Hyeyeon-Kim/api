"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = void 0;
class UserResponseDto {
    user_name;
    uid;
    id;
    email;
    constructor(data) {
        this.id = data._id;
        this.uid = data.uid;
        this.user_name = data.user_name;
        this.email = data.email;
    }
}
exports.UserResponseDto = UserResponseDto;
//# sourceMappingURL=response-user.dto.js.map