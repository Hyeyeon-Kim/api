import { CustomException } from 'src/common/exception/custom-exception';
export declare class IndexOutOfRangeException extends CustomException {
    constructor(preidx: number, nextidx: number, length: number);
}
