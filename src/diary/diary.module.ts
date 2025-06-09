import { Module } from "@nestjs/common";
import { DiaryController } from "./diary.controller";
import { DiaryService } from "./diary.service";
import { MongooseModuleWithValidation } from "src/common/mongoose-module-with-validation";
import { Diary, DiarySchema } from "./entities/diary.schema";
import { UploadModule } from "src/upload/upload.module";

@Module({
  imports: [
    MongooseModuleWithValidation([{ name: Diary.name, schema: DiarySchema }]),
    UploadModule,
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
  exports: [DiaryService],
})
export class DiaryModule {}
