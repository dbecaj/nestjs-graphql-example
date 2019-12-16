import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User, CreateUser, UpdateUser } from './user.entity';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver(of => User)
export class UserResolver {

    constructor (
        private readonly userService: UserService,
    ) {}

    @UseGuards(AuthGuard('local'))
    @Mutation(returns => User)
    async updateUser(@Args('id') id: string, @Args('user') user: UpdateUser) {
        return this.userService.update(id, user);
    }
}
