import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import IUser from "../interfaces/user.interface";

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: { user: IUser } = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
