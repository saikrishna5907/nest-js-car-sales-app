import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../user.entity";

export const CurrentUser = createParamDecorator((data: never, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    console.log(request.currentUser)
    return request.currentUser;
}) 