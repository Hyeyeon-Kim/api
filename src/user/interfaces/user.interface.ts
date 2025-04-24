import { Types } from "mongoose";

export interface IUser {
  id: Types.ObjectId;
  uid: string;
  email: string;
  user_name: string;
}

export default IUser;
