import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    public async createUser(userDetails: CreateUserDto) {
        const user = await this.repo.create(userDetails);

        return this.repo.save(user);
    }
    public async findOne(userId: number) {
        const user = this.repo.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }
    public async find(email: string) {
        return this.repo.findBy({ email });
    }
    public async update(id: number, userDetails: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, userDetails)
        return this.repo.save(user);
    }
    public async remove(id: number) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }
}
