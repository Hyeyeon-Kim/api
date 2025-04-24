import { CustomException } from 'src/common/exception/custom-exception';
export declare class InvalidPreIndexException extends CustomException {
    constructor(preidx: number, id: string);
}
