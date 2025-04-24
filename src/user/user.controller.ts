import { Controller, Post, Body, Headers, Patch, Delete } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GetUser } from "./decorators/get-user.decorator";
import { UserService } from "./user.service";
import { UserInfo } from "./entities/user.schema";
import IUser from "./interfaces/user.interface";
import { Public } from "src/common/public.decorator";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @Public()
  @ApiOperation({ summary: "유저 생성" })
  @ApiCreatedResponse({ description: "유저 생성" })
  signin(@Headers("authorization") authorization: string) {
    if (process.env.NODE_ENV === "test") {
      return this.userService.signinForTest();
    }
    return this.userService.signin(authorization);
  }

  @ApiOperation({ summary: "Update a user by ID" })
  @ApiResponse({ status: 200, description: "User updated successfully." })
  @ApiBearerAuth()
  @Patch()
  update(@GetUser() userDto: IUser, @Body() data: Partial<UserInfo>) {
    return this.userService.updateUser(userDto.id, data);
  }

  @ApiOperation({ summary: "Delete a user by ID" })
  @ApiResponse({ status: 200, description: "User deleted successfully." })
  @ApiBearerAuth()
  @Delete()
  remove(@GetUser() userDto: IUser) {
    return this.userService.deleteUser(userDto.id);
  }
}
