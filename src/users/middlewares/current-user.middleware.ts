import { Injectable } from '@nestjs/common';
import { UsersService } from './../users.service';
import { NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { User } from '../user.entity';


//  to add extra variable to the express request type and not be able to get error
declare global {
    namespace Express {
        interface Request {
            currentUser?: User
        }
    }
}

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {

    constructor(private usersService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        if (userId) {
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }
        next();
    }

}