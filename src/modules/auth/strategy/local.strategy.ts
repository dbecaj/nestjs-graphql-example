import { Strategy } from "passport-local";
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "../auth.service";
import { User } from "../../user/user.entity";
import { UnauthorizedException } from "@nestjs/common";

export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor (
        private readonly authService: AuthService,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.authService.validateLocalUser(email, password);
        if (!!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}