import { HttpStatus, ConflictException } from "@nestjs/common";

export class UserAlredyJoinedException extends ConflictException {
  constructor(id: string) {
    super({
      status: HttpStatus.CONFLICT,
      message: `이미 가입된 회원입니다 (${id}).`,
    });
  }
}
