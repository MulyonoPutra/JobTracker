import { Injectable } from '@nestjs/common';
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
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
