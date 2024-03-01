import { Injectable, NotFoundException } from '@nestjs/common';

import { Activity } from './entities/activity.entity';
import { ActivityResponseType } from './types/activity-response.type';
import { CreateActivityDto } from './dto/create-activity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
  constructor(private prismaService: PrismaService) {}

  async create(createActivityDto: CreateActivityDto, userId?: string) {
    createActivityDto.userId = userId;
    return await this.prismaService.activity.create({
      data: createActivityDto,
    });
  }

  async findAll(): Promise<ActivityResponseType[]> {
    return await this.prismaService.activity.findMany({
      select: {
        id: true,
        companyName: true,
        position: true,
        location: true,
        jobType: true,
        status: true,
        jobPosted: true,
        category: true,
        appliedOn: true,
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.prismaService.activity.findFirst({
      where: {
        id,
      },
    });

    if (!activity) {
      throw new NotFoundException('Activity is not found!');
    }

    return activity;
  }

  async update(
    id: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    return await this.prismaService.activity.update({
      data: updateActivityDto,
      where: { id },
    });
  }

  async remove(id: string): Promise<string> {
    await this.prismaService.activity.delete({
      where: { id },
    });

    return `this ${id} successfully removed!`;
  }
}
