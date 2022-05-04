import { Report } from './reports/report.entity';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session');
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          synchronize: true
        }
      }
    }),
    UsersModule,
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    })
  ],
  controllers: [],

  providers: [
    // here whitelist will validate if the request body is exactly expecting same properties as expected,
    // throws error if client sends extra properties or different properties 
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
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
