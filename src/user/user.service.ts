import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserInfo } from "./entities/user.schema";
import { Model, Types } from "mongoose";
import { UserResponseDto } from "./dtos/response-user.dto";
import { UserNotFoundException } from "./exceptions/user-not-found";
import { auth } from "firebase-admin";
import { UserAlredyJoinedException } from "./exceptions/user-already-joined.exception";

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
      uid: "test",
    });

    if (user) {
      throw new UserAlredyJoinedException("test");
    }
    await new this.userModel({
      uid: "test",
      email: "test@gmail.com",
      user_name: "test",
      user_image:
        "https://lh3.googleusercontent.com/a/ACg8ocJQlf3Lsc7V8un9AJSOx7ttgxL5j2Lh49puSWOpQ3xLA6j1ew=s96-c",
    }).save();
  }

  async signin(token: string) {
    token = token.replace("Bearer ", "");

    const firebaseUser: { uid: string; email?: string; name?: string } =
      await auth()
        .verifyIdToken(token, true)
        .catch((err: Error) => {
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
    });

    await createdUser.save();
  }

  async deleteUser(userId: Types.ObjectId) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new UserNotFoundException(userId.toString());
    }
    // Firebase Auth에서 사용자 삭제
    await auth().deleteUser(user.uid);
    // Mongoose에서 사용자 삭제
    await this.userModel.deleteOne({ _id: userId });
  }

  async updateUser(userId: Types.ObjectId, userInfo: Partial<UserInfo>) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new UserNotFoundException(userId.toString());
    }

    // Firebase Auth에서 사용자 정보 업데이트
    await auth().updateUser(user.uid, {
      displayName: userInfo.user_name,
      email: userInfo.email,
    });

    // Mongoose에서 사용자 정보 업데이트
    await this.userModel.updateOne(
      { _id: userId },
      {
        $set: {
          user_name: userInfo.user_name,
          email: userInfo.email,
        },
      },
    );
  }
}
