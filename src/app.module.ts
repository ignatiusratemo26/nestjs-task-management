import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ItemsModule } from './items/items.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RequestService } from './request.service';
import { AuthenticationMiddleware } from 'src/common/middleware/authentication.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    DatabaseModule,
    TasksModule,
    ItemsModule,
    AuthModule,
    UsersModule,
  ],
  providers: [RequestService]

})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude('auth/signup','auth/signin')
      .forRoutes("*");

  }
}
