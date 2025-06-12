import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { DiaryModule } from "./diary/diary.module";
import { MusicModule } from "./music/music.module";
import { UploadModule } from "./upload/upload.module";
import { MulterModule } from "@nestjs/platform-express";
import * as multer from "multer";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역에서 환경변수 사용 가능
    }),
    MulterModule.register({
      storage: multer.memoryStorage(), // ✅ buffer 사용 가능하도록 설정
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL!, {
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DBNAME_MAIN,
    }),
    UserModule,
    AuthModule,
    DiaryModule,
    UploadModule,
    MusicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
