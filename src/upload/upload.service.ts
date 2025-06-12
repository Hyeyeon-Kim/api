import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { randomUUID } from "crypto";
import { S3UploadException } from "./exception/s3-upload.exception";
import { AudioResponseDto } from "./dto/audio-response.dto";
import { S3DeleteException } from "./exception/s3-delete.exception";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UploadService {
  private s3 = new S3();

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.configService.get("A_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get("A_SECRET_ACCESS_KEY"),
      region: this.configService.get("A_REGION"),
    });
  }

  async create(parentDirectory: string, file) {
    const extension = file.originalname.split(".").pop();
    const convertedName = randomUUID() + "." + extension;
    const params = {
      Bucket: this.configService.get("AWS_BUCKET_NAME"),
      Key: `${parentDirectory}/${convertedName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // 선택: URL로 접근할 수 있게 할 경우
    };

    const data = await this.s3
      .upload(params)
      .promise()
      .catch((error) => {
        throw new S3UploadException();
      });
    return new AudioResponseDto({
      name: file.originalname,
      key: `${parentDirectory}/${convertedName}`,
      s3Url: data.Location,
      converte_name: convertedName,
    });
  }

  async remove(parentDirectory: string, s3Url: string): Promise<void> {
    const parts = s3Url.split("/");
    const fileName = parts[parts.length - 1];

    const params = {
      Bucket: this.configService.get("AWS_BUCKET_NAME"),
      Key: `${parentDirectory}/${fileName}`,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      console.error("Error deleting file:", error);
      throw new S3DeleteException();
    }
  }
}
