import { Injectable, NotFoundException } from '@nestjs/common';

import { Activity } from './entities/activity.entity';
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

  async findAll(page?: number, perPage?: number) {
    const skip = (page - 1) * perPage;
    const activities = await this.prismaService.activity.findMany({
      skip,
      take: perPage,
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

    const total = await this.prismaService.category.count();
    const lastPage = Math.ceil(total / perPage);

    const response = {
      items: activities,
      pagination: {
        total: total,
        lastPage: lastPage,
        currentPage: page,
        perPage: perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
    return response;
  }

  async findOne(id: string) {
    const activity = await this.prismaService.activity.findFirst({
      where: {
        id,
      },
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
