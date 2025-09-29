import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ItemsModule } from './items/items.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from 'src/common/middleware/authentication.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
      inject:[ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true}),
    DatabaseModule,
    TasksModule,
    ItemsModule,
    AuthModule,
  ],
  providers: [RequestService]

})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude('auth/login','auth/register')
      .forRoutes("*");

  }
}
