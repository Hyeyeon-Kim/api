import { Module } from "@nestjs/common";
import { DiaryController } from "./diary.controller";
import { DiaryService } from "./diary.service";
import { MongoosModuleWithValidation } from "src/common/mongoose-module-with-validation";
import { Diary, DiarySchema } from "./entities/diary.schema";

@Module({
  imports: [
    MongoosModuleWithValidation([{ name: Diary.name, schema: DiarySchema }]),
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
