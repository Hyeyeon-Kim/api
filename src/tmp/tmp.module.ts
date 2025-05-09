import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { GoogleGenAI } from "@google/genai";
import { TmpService } from "./tmp.service";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "GOOGLE_GENAI",
      useFactory: (config: ConfigService) => {
        return new GoogleGenAI({
          apiKey: config.get<string>("GEMINI_API_KEY"),
        });
      },
      inject: [ConfigService],
    },
    TmpService,
    TmpService,
  ],
  exports: [TmpService],
})
export class TmpModule {}
