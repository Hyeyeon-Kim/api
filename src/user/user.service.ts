import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserInfo } from './entities/user.schema';
import { Model, Types } from 'mongoose';
import { UserResponseDto } from './dtos/response-user.dto';
import { UserNotFoundException } from './exceptions/user-not-found';
import { auth } from 'firebase-admin';
import { UserAlredyJoinedException } from './exceptions/user-already-joined.exception';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByFirebase(userid: string): Promise<UserResponseDto> {
    const user = await this.userModel
      .findOne(
        {
          uid: userid,
        },
        // { _id: 0, User_name: 1, User_image: 1, status: 1 }, // 원하는 필드만 가져오기
      )
      .catch(() => {
        throw new UserNotFoundException(userid);
      });

    if (user == null) {
      throw new UserNotFoundException(userid);
    }
    return new UserResponseDto(user);
  }

  async signinForTest() {
    const user = await this.userModel.findOne({
      uid: 'test',
    });

    if (user) {
      throw new UserAlredyJoinedException('test');
    }
    await new this.userModel({
      uid: 'test',
      email: 'test@gmail.com',
      user_name: 'test',
      user_image:
        'https://lh3.googleusercontent.com/a/ACg8ocJQlf3Lsc7V8un9AJSOx7ttgxL5j2Lh49puSWOpQ3xLA6j1ew=s96-c',
    }).save();
  }

  async signin(token: string) {
    token = token.replace('Bearer ', '');

    const firebaseUser: any = await auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });

    const user = await this.userModel.findOne({
      uid: firebaseUser.uid,
    });

    if (user) {
      throw new UserAlredyJoinedException(firebaseUser.uid);
    }

    const createdUser = new this.userModel({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      user_name: firebaseUser.name,
      user_image: firebaseUser.picture,
    });

    await createdUser.save();

    await this.WorkService.createForFirst(createdUser.id);
    await this.MemoService.createForFirst(createdUser.id);
    await this.MemocharacterService.createForFirst(createdUser.id);
  }

  async login(userId: Types.ObjectId) {
    const user = await this.userModel.findById(userId);
    const today = new Date();
    const last_attendance = user.last_attendance;
    //한국 시간기준으로 last_attendance 날짜가 오늘 날짜와 다르면 출석 초기화
    const koreanToday = new Date(
      today.getTime() + 9 * 60 * 60 * 1000,
    ).toISOString();
    const koreanLastAttendance = new Date(
      last_attendance.getTime() + 9 * 60 * 60 * 1000,
    ).toISOString();
    if (koreanToday.slice(0, 10) !== koreanLastAttendance.slice(0, 10)) {
      user.attendance = user.attendance + 1;
      user.last_attendance = today;
    }
    await user.save();
    return new UserInfo(user);
  }

  async getProfile(userId: Types.ObjectId) {
    const user = await this.userModel.findById(userId);
    const attendanceDays = user.attendance;
    const allWorks = await this.WorkModel.countDocuments({
      author: userId,
      category: { $ne: 'trash' },
    });
    const completedWorks = await this.WorkModel.countDocuments({
      author: userId,
      category: 'completed',
    });

    return new UsageDto({
      attendanceDays,
      allWorks,
      completedWorks,
      user_name: user.user_name,
      email: user.email,
      user_image: user.user_image,
    });
  }

  async updateProfile(userId: Types.ObjectId, file: Express.Multer.File) {
    const user = await this.userModel.findById(userId);
    const path = 'users/' + userId;

    if (typeof user.user_image === 'object') {
      await this.uploadService.remove(path, user.user_image.s3Url);
    }

    const updatedata = await this.uploadService.create(path, file);
    user.updateOne({ _id: userId }, { user_image: updatedata });

    return updatedata.s3Url;
  }
}
