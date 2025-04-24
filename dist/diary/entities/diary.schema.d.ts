import { HydratedDocument, Types } from "mongoose";
export type DiaryDocument = HydratedDocument<Diary>;
export declare class Diary {
    title: string;
    content: string;
    day: string;
    writer: Types.ObjectId;
    modes: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const DiarySchema: import("mongoose").Schema<Diary, import("mongoose").Model<Diary, any, any, any, import("mongoose").Document<unknown, any, Diary> & Diary & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Diary, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Diary>> & import("mongoose").FlatRecord<Diary> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
declare const DiaryInfo_base: import("@nestjs/common").Type<Pick<Diary, "title" | "content" | "day">>;
export declare class DiaryInfo extends DiaryInfo_base {
    constructor(partial: Diary);
}
export {};
