import { Types } from "mongoose";
import { UserDocument } from "../entities/user.schema";
import { IUser } from "../interfaces/user.interface";

export class UserResponseDto implements IUser {
  readonly user_name: string;
  readonly uid: string;
  readonly id: Types.ObjectId;
  readonly email: string;

  constructor(data: Pick<UserDocument, "_id" | "uid" | "user_name" | "email">) {
    this.id = data._id;
    this.uid = data.uid;
    this.user_name = data.user_name;
    this.email = data.email;
  }
}
