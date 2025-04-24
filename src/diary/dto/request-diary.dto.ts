import { ApiProperty, PickType } from "@nestjs/swagger";

class UpdatableDiary {
  @ApiProperty({
    example: "다이어리 제목",
    description: "다이어리 제목",
  })
  title: string;

  @ApiProperty({
    example: "다이어리 내용",
    description: "다이어리 내용",
  })
  content: string;

  @ApiProperty({
    example: ["기분"],
    description: "기분",
  })
  modes: string[];
}

export class RequestUpdateDiaryNameDto extends PickType(UpdatableDiary, [
  "title",
]) {}

export class RequestUpdateDiaryDescriptionDto extends PickType(UpdatableDiary, [
  "content",
]) {}

export class RequestUpdateDiaryModesDto extends PickType(UpdatableDiary, [
  "modes",
]) {}
