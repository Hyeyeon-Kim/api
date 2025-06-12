import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { DiaryService } from "./diary.service";
import { GetUser } from "src/user/decorators/get-user.decorator";
import IUser from "src/user/interfaces/user.interface";
import {
  ResponseCalendarDto,
  ResponseDiaryDto,
  ResponseTotalMoodDto,
  ResponseWeeklyDto,
} from "./dto/response-diary.dto";
import { Types } from "mongoose";
import { StringToObjectIdPipe } from "src/common/string-to-objectId-pipe";
import { DiaryInfo } from "./entities/diary.schema";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Diary")
@Controller("diarys")
@ApiUnauthorizedResponse({ description: "Unauthorized" })
@ApiBearerAuth()
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @ApiOperation({ summary: "다어어리 생성" })
  @ApiCreatedResponse({ description: "다어어리 생성", type: String })
  creatediary(@GetUser() userDto: IUser, @Body() data: DiaryInfo) {
    return this.diaryService.create(userDto.id, data);
  }

  @Get()
  @ApiOperation({ summary: "다어어리 전체 조회" })
  @ApiOkResponse({ description: "다어어리 전체 조회", type: ResponseDiaryDto })
  getAllDiary(@GetUser() userDto: IUser) {
    return this.diaryService.getAll(userDto.id);
  }

  @UseInterceptors(FileInterceptor("file"))
  @Post("/stt")
  @ApiOperation({ summary: "다어어리 생성" })
  @ApiCreatedResponse({ description: "다어어리 생성", type: String })
  creatediaryWithStt(@GetUser() userDto: IUser, @UploadedFile() file) {
    console.log("mimetype:", file.mimetype); // 예: audio/mpeg
    console.log("Mimetype:", file.mimetype);
    console.log("Buffer length:", file.buffer?.length);
    return this.diaryService.createWithStt(userDto.id, file);
  }

  @Get("/weekly")
  @ApiOperation({ summary: "주 단위의 감정 수치 보여주기 " })
  @ApiOkResponse({
    description: "주 단위의 감정 수치 보여주기 ",
    type: ResponseWeeklyDto,
  })
  getWeekly(@GetUser() userDto: IUser) {
    return this.diaryService.getWeekly(userDto.id);
  }

  @Get("/calendar")
  @ApiOperation({ summary: "한 달 주요 감정 보여주기 " })
  @ApiOkResponse({
    description: "한 달 주요 감정 보여주기 ",
    type: ResponseCalendarDto,
  })
  getCalendar(@GetUser() userDto: IUser) {
    return this.diaryService.getCalendar(userDto.id);
  }

  @Get("/total")
  @ApiOperation({ summary: "감정 통계 보여주기 " })
  @ApiOkResponse({
    description: "감정 통계 보여주기 ",
    type: ResponseTotalMoodDto,
  })
  getTotal(@GetUser() userDto: IUser) {
    return this.diaryService.getTotal(userDto.id);
  }

  @Get(":id")
  @ApiOperation({ summary: "다어어리 조회" })
  @ApiOkResponse({ description: "다어어리 조회", type: ResponseDiaryDto })
  getDiary(@Param("id", StringToObjectIdPipe) diaryId: Types.ObjectId) {
    return this.diaryService.getOne(diaryId);
  }

  @Delete(":id")
  @ApiOperation({ summary: "다어어리 삭제" })
  @ApiParam({ name: "id", description: "다어어리 ID", type: String })
  @ApiNoContentResponse({ description: "다어어리 삭제" })
  @ApiForbiddenResponse({ description: "다른 사용자의 다어어리 삭제 시도" })
  @ApiNotFoundResponse({ description: "다이어리를 찾을 수 없음" })
  deleteDiary(
    @GetUser() userDto: IUser,
    @Param("id", StringToObjectIdPipe) diaryId: Types.ObjectId
  ) {
    return this.diaryService.deleteDiary(userDto.id, diaryId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "다어어리 수정" })
  @ApiParam({ name: "id", description: "다어어리 ID", type: String })
  @ApiNoContentResponse({ description: "다어어리 수정" })
  @ApiForbiddenResponse({ description: "다른 사용자의 다어어리 수정 시도" })
  @ApiNotFoundResponse({ description: "다이어리를 찾을 수 없음" })
  updateDiary(
    @GetUser() userDto: IUser,
    @Param("id", StringToObjectIdPipe) diaryId: Types.ObjectId,
    @Body() data: Partial<DiaryInfo>
  ) {
    return this.diaryService.updateDiary(userDto.id, diaryId, data);
  }
}
