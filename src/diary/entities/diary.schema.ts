import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PickType } from "@nestjs/swagger";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";

export type DiaryDocument = HydratedDocument<Diary>;
@Schema({ timestamps: true, versionKey: false })
export class Diary {
  @Prop({ type: String, default: "" })
  title: string;

  @Prop({ type: String, default: "" })
  content: string;

  @Prop({ type: String, default: "" })
  day: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "User" })
  writer: Types.ObjectId;

  @Prop({ type: [String], default: "" })
  modes: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);

export class DiaryInfo extends PickType(Diary, ["title", "content", "day"]) {
  constructor(partial: Diary) {
    super();
    this.title = partial.title;
    this.content = partial.content;
    this.day = partial.day;
  }
}
