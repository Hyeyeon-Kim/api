import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from "passport-firebase-jwt";
import { auth } from "firebase-admin";
import { UserService } from "src/user/user.service";
import { Reflector } from "@nestjs/core";
import { UserResponseDto } from "src/user/dtos/response-user.dto";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  "firebase-auth",
) {
  constructor(
    private readonly reflector: Reflector,
    private readonly userservice: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token: string): Promise<UserResponseDto> {
    if (process.env.NODE_ENV === "test") {
      return await this.userservice.findOneByFirebase("test");
    }

    const firebaseUser: DecodedIdToken = await auth()
      .verifyIdToken(token, true)
      .catch((err: Error) => {
        throw new UnauthorizedException(err.message);
      });
    return await this.userservice.findOneByFirebase(firebaseUser.uid);
  }
}
