import { Controller, Get, Query, BadRequestException } from "@nestjs/common";
import { MusicService } from "./music.service";
import { GetUser } from "src/user/decorators/get-user.decorator";
import IUser from "src/user/interfaces/user.interface";

@Controller("music")
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  /**
   * GET /music/recommend?mood=행복&limit=10
   * - mood: "행복" | "슬픔" | "분노" | "중립" | "놀람" | "공포"
   * - limit (선택): 추천 곡 개수 (1~100 권장; 기본 20)
   */
  @Get("recommend")
  async getRecommendation(@GetUser() userDto: IUser) {
    try {
      return await this.musicService.recommendByMood(20, userDto.id);
    } catch (err) {
      throw new BadRequestException(
        (err as any)?.message || "추천 중 오류가 발생했습니다."
      );
    }
  }
}
