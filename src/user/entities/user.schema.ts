import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ApiProperty, PickType } from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false }) // timestamps: createdAt과 updatedAt을 자동으로 생성
export class User {
  @ApiProperty({
    description: "User ID(monogodb)",
    example: "60f6e4b0b5b4b4001f9f4f5b",
    type: String,
  })
  id: Types.ObjectId;

  @Prop({ type: String, required: true })
  @ApiProperty({
    example: "google-oauth2|123456789012345678901",
    description: "User ID(firebase)",
  })
  uid: string;

  @Prop({ type: String })
  @ApiProperty({
    example: "asdf@gmail.com",
    description: "User email",
  })
  email: string;

  @Prop({ type: String })
  @ApiProperty({
    example: "홍길동",
    description: "User 이름",
  })
  user_name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserInfo extends PickType(User, ["email", "user_name"]) {
  constructor(partial: User) {
    super();
    this.email = partial.email;
    this.user_name = partial.user_name;
  }
}
