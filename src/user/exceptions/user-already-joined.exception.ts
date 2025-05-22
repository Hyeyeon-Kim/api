import { HttpStatus } from "@nestjs/common";
import { ConflictException } from "src/common/exception/custom-exception";

export class UserAlredyJoinedException extends ConflictException {
  constructor(id: string) {
    super(`이미 가입된 회원입니다 (${id}).`, HttpStatus.NOT_FOUND);
  }
}
