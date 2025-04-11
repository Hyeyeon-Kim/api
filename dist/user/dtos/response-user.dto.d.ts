import { Types } from 'mongoose';
import { UserDocument } from '../entities/user.schema';
import { IUser } from '../interfaces/user.interface';
export declare class UserResponseDto implements IUser {
    readonly user_name: string;
    readonly user_image: string;
    readonly uid: string;
    readonly id: Types.ObjectId;
    readonly status: string;
    readonly email: string;
    constructor(data: Pick<UserDocument, '_id' | 'uid' | 'user_name' | 'user_image' | 'status' | 'email'>);
}
