import { Types } from "mongoose";
import { CustomException } from "src/common/exception/custom-exception";
export declare class DiaryNotFoundException extends CustomException {
    constructor(id: Types.ObjectId);
}
