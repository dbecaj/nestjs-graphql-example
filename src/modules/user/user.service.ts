import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, CreateUser, UpdateUser } from './user.entity';
import { Repository } from 'typeorm';
import { CryptoUtil } from '../../util/cypto.util';

@Injectable()
export class UserService {

    constructor (
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) {}

    async create(user: CreateUser): Promise<User> {
        return this.userRepo.save(this.userRepo.merge(new User(), user));
    }

    async get(id: string): Promise<User> {
        return this.userRepo.findOne(id);
    }

    async getByEmail(email: string): Promise<User> {
        return this.userRepo.findOne({ where: { email }});
    }

    async update(id: string, user: UpdateUser): Promise<User> {
        return this.userRepo.save({
            id,
            ...user
        });
    }

    async delete(id: string): Promise<Boolean> {
        return new Promise<Boolean>(async (resolve, reject) => {
            const result = await this.userRepo.delete(id);
            resolve(!!result.affected);
        }) 
    }
}
