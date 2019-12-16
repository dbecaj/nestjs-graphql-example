import { Injectable, CanActivate, ExecutionContext, UseGuards, createParamDecorator } from "@nestjs/common";
import { UserRole } from "./user.entity";

export const AuthUser = createParamDecorator((data, req) => { return req.user; })

@Injectable()
export class IsAdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();

        return req.user.role != UserRole.ADMIN;
    }
}

export const IsAdmin = () => UseGuards(IsAdminGuard);