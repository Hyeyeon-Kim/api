import { UserService } from "./user.service";
import { UserInfo } from "./entities/user.schema";
import IUser from "./interfaces/user.interface";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signin(authorization: string): Promise<void>;
    update(userDto: IUser, data: Partial<UserInfo>): Promise<void>;
    remove(userDto: IUser): Promise<void>;
}
