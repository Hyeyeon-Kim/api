import { CustomException } from "src/common/exception/custom-exception";
export declare class UserNotFoundException extends CustomException {
    constructor(id: string);
}
