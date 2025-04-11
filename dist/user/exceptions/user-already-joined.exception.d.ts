import { CustomException } from 'src/common/exception/custom-exception';
export declare class UserAlredyJoinedException extends CustomException {
    constructor(id: string);
}
