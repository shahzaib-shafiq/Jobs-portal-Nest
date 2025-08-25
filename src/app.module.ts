import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import { SavedJobModule } from './saved-job/saved-job.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, CompanyModule, JobModule,  ApplicationModule, SavedJobModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
