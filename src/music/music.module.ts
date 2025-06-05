import { Module } from "@nestjs/common";
import { MusicController } from "./music.controller";
import { MusicService } from "./music.service";
import { DiaryModule } from "src/diary/diary.module";

@Module({
  imports: [DiaryModule],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
