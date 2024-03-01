import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [CloudinaryModule],
})
export class UserModule {}
