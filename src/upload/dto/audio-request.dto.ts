// import { ApiProperty } from '@nestjs/swagger';

export class AudioRequestDto {
  // @ApiProperty({
  //   description: '파일 업로드할 때 파일명',
  //   example: '1.png',
  // })
  readonly name: string;

  // @ApiProperty({
  //   description: 'Object key',
  //   example: 'test/41f1904d-cb2e-45f3-b5ee-072bc49cba11.png',
  // })
  readonly key: string;

  // @ApiProperty({
  //   description: 'S3에 저장된 파일 URL',
  //   example:
  //     'https://example-bucket.s3.region.amazonaws.com/test/41f1904d-cb2e-45f3-b5ee-072bc49cba11.png',
  // })
  readonly s3Url: string;
}
