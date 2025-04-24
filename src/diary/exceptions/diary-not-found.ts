import { HttpStatus } from "@nestjs/common";
import { Types } from "mongoose";
import { CustomException } from "src/common/exception/custom-exception";

export class DiaryNotFoundException extends CustomException {
  constructor(id: Types.ObjectId) {
    super(
      `id(${id.toString()})로 만든 일기가 존재하지 않습니다`,
      HttpStatus.NOT_FOUND,
    );
  }
}
