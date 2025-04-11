import { HydratedDocument, Types } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    id: Types.ObjectId;
    uid: string;
    status: string;
    email: string;
    user_name: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare const UserInfo_base: import("@nestjs/common").Type<Pick<User, "email" | "user_name">>;
export declare class UserInfo extends UserInfo_base {
    constructor(partial: Partial<User>);
}
export {};
