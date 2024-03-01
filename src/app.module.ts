import { APP_FILTER } from '@nestjs/core';
import { ActivityModule } from './modules/activity/activity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './modules/auth/utils/http-exception.filter';
import { JobCategoryModule } from './modules/job-category/job-category.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    JobCategoryModule,
    ActivityModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthenticationGuard,
    // },
  ],
})
export class AppModule {}
