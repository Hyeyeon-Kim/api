import { User, UserInfo } from "./entities/user.schema";
import { Model, Types } from "mongoose";
import { UserResponseDto } from "./dtos/response-user.dto";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    findOneByFirebase(userid: string): Promise<UserResponseDto>;
    signinForTest(): Promise<void>;
    signin(token: string): Promise<void>;
    deleteUser(userId: Types.ObjectId): Promise<void>;
    updateUser(userId: Types.ObjectId, userInfo: Partial<UserInfo>): Promise<void>;
}
