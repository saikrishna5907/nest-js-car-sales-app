import { UsersService } from './../../users/users.service';
import { Injectable } from "@nestjs/common";
import { User } from 'src/users/user.entity';

@Injectable()
export class FakeUserService implements Partial<UsersService>{
    public users: User[] = []
    find = (email: string) => {
        const filteredUsers = this.users.filter(user => user.email === email);
        return Promise.resolve(filteredUsers)
    }
    create = (userDetails: { email: string, password: string }) => {
        const user = { id: Math.floor(Math.random() * 99999999), ...userDetails } as User
        this.users.push(user)
        return Promise.resolve(user);
    }
}