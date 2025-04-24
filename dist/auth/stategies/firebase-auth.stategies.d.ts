import { Strategy } from "passport-firebase-jwt";
import { UserService } from "src/user/user.service";
import { Reflector } from "@nestjs/core";
import { UserResponseDto } from "src/user/dtos/response-user.dto";
declare const FirebaseAuthStrategy_base: new (...args: [options: any, verify: any] | [options: any]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class FirebaseAuthStrategy extends FirebaseAuthStrategy_base {
    private readonly reflector;
    private readonly userservice;
    constructor(reflector: Reflector, userservice: UserService);
    validate(token: string): Promise<UserResponseDto>;
}
export {};
