import { AuthGuard } from '../guards/auth.guard';
import { User } from './user.entity';
import { UserDto } from './dtos/user.dto';
import { Serialize } from './../interceptors/serialize.interceptor';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService) { }

    @Post('/signUp')
    public async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        session.userId = user.id
        return user;
    }
    @Post('/signIn')
    public async authenticateUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.authenticate(body.email, body.password);
        session.userId = user.id
        return user;
    }
    @Get('/:id')
    public async findUser(@Param('id') id: string) {
        return this.usersService.findOne(parseInt(id));
    }
    @Get('/findAllUsers')
    public async findAllUsers(@Query('email') emailId: string) {
        return this.usersService.find(emailId);
    }
    @Delete('/:id')
    public async deleteUser(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Patch('/:id')
    public async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(+id, body);
    }
    @UseGuards(AuthGuard)
    @Get('/getCurrentUser')
    public async getCurrentUser(@CurrentUser() user: User) {
        return user;
    }
}
