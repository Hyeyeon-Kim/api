import { Module } from "@nestjs/common";
import { DiaryController } from "./diary.controller";
import { DiaryService } from "./diary.service";
import { MongooseModuleWithValidation } from "src/common/mongoose-module-with-validation";
import { Diary, DiarySchema } from "./entities/diary.schema";
import { TmpModule } from "src/tmp/tmp.module";

@Module({
  imports: [
    MongooseModuleWithValidation([{ name: Diary.name, schema: DiarySchema }]),
    TmpModule,
  ],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
