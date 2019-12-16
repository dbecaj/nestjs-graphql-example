import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User, CreateUser, LoginUser } from '../user/user.entity';
import { CryptoUtil } from '../../util/cypto.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor (
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateLocalUser(email: string, password: string): Promise<User> {
        const user = await this.userService.getByEmail(email);
        if (!!user) {
            throw new NotFoundException(`User with email ${email} doesn't exist`);
        }

        // Compare hash passwords
        if (user.password != CryptoUtil.generateHash(password)) {
            throw new UnauthorizedException(`Invalid password for user ${email}`);
        }

        // User is authenticated sucessfully
        return user;
    }

    async register(user: CreateUser): Promise<User> {
        // Check if user already exists
        if (!!(await this.userService.getByEmail(user.email))) {
            throw new ConflictException(`User with email ${user.email} already exists`)
        }

        // Hash the password
        user.password = CryptoUtil.generateHash(user.password);

        return this.userService.create(user);
    }

    login(user: User): { token: string } {
        const payload = { email: user.id, sub: user.email }
        return {
            token: this.jwtService.sign(payload)
        };
    }
}
