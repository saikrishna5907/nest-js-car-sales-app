import { Report } from './reports/report.entity';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true
    }),
    UsersModule,
    ReportsModule
  ],
  controllers: [],

  providers: [
    // here whitelist will validate if the request body is exactly expecting same properties as expected,
    // throws error if client sends extra properties or different properties 
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['sometexttoencrytpcookieinfo']
        }),
      ).forRoutes('*') // * mean to load this middleware to every single request comes into this application
  }
}
