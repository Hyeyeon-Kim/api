import { Types } from 'mongoose';
export interface IUser {
    id: Types.ObjectId;
    uid: string;
    status: string;
    email: string;
    user_name: string;
    user_image: string;
}
export default IUser;
