import { HttpStatus } from '@nestjs/common';
import { CustomException } from 'src/common/exception/custom-exception';

export class InvalidPreIndexException extends CustomException {
  constructor(preidx: number, id: string) {
    super(
      ` 'preidx'(${preidx})와 'id'(${id})가 일치하지 않습니다`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
