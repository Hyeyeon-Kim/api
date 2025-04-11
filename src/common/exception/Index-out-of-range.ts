import { HttpStatus } from '@nestjs/common';
import { CustomException } from 'src/common/exception/custom-exception';

export class IndexOutOfRangeException extends CustomException {
  constructor(preidx: number, nextidx: number, length: number) {
    super(
      ` 'preidx'(${preidx}) 또는 'nextidx'(${nextidx})가 범위를 벗어났습니다. 0 - ${length - 1}사이의 값을 입력해주세요.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
