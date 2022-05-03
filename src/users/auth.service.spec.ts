import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Test } from "@nestjs/testing"

describe('AuthService', () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = []
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers)
            },
            create: (userDetails: { email: string, password: string }) => {
                const user = { id: Math.floor(Math.random() * 99999999), ...userDetails } as User
                users.push(user)
                return Promise.resolve(user);
            }
        }
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UsersService, useValue: fakeUsersService }
            ]
        }).compile();
        service = module.get(AuthService);
    })

    it('can create an instance of the auth service', async () => {
        expect(service).toBeDefined();
    })
    it('create a new user with a salted and hashed password', async () => {
        const user = await service.signUp('test@test.com', 'test');

        expect(user.password).not.toEqual('test');

        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('throws an error if user sign up with email already exists', async () => {

        await service.signUp('test@test.com', 'asdas')

        await expect(service.signUp('test@test.com', 'asdf')).rejects.toThrowError(BadRequestException);
    })

    it('throws if signin is called with an unused email', async () => {

        await expect(service.authenticate('asdasd@gmail.com', 'asdasd')).rejects.toThrowError(NotFoundException)
    })

    it('throws if an invalid password is provided', async () => {
        await service.signUp('test@test.com', 'asdas')
        await expect(service.authenticate('test@test.com', '12312')).rejects.toThrowError(BadRequestException)
    })

    it('returns a user if correct password is provided', async () => {
        await service.signUp('sasi1@gmail.com', 'tt')
        const user = await service.authenticate('sasi1@gmail.com', 'tt')

        expect(user).toBeDefined();
    })
})
