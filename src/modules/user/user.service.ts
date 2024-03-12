import * as cloudinary from 'cloudinary';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        summary: true,
      },
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        summary: true,
        address: true,
        education: true,
        experience: true,
      },
    });
  }

  async updated(id: string, data: UpdateUserDto) {
    return await this.prismaService.user.update({
      data,
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        summary: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }

  async uploadAvatar(id: string, file: Express.Multer.File) {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'nest',
    });
    const avatar = result.secure_url;
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (user) {
      const updated = await this.prismaService.user.update({
        data: {
          avatar,
        },
        where: {
          id,
        },
      });

      if (updated) {
        return {
          statusCode: 200,
          message: 'Avatar Uploaded!',
        };
      }
    }

    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
}
