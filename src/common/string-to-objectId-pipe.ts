import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class StringToObjectIdPipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== "string") {
      throw new BadRequestException("Validation failed");
    }
    try {
      return new Types.ObjectId(value);
    } catch {
      throw new BadRequestException("Validation failed");
    }
  }
}
