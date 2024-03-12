import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UploadedFile,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUserId } from 'src/common/decorators';
import { AuthGuards } from 'src/common/guards/auth.guard';
import { User } from './entities/user.entity';
import { UploadAvatarDecorator } from 'src/common/decorators/upload-avatar.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuards)
  @Get('/detail')
  async findOne(@CurrentUserId() id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @UseGuards(AuthGuards)
  @UsePipes(ValidationPipe)
  @Patch('/:id')
  update(@CurrentUserId() userId: string, @Body() body: UpdateUserDto) {
    return this.userService.updated(userId, body);
  }

  @UploadAvatarDecorator()
  async upload(
    @CurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.uploadAvatar(userId, file);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file, 'nest');
  }
}
