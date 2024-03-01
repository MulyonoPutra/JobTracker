import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { JobCategory } from './entities/job-category.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';

@Injectable()
export class JobCategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(createJobCategoryDto: CreateJobCategoryDto) {
    return await this.prismaService.category.create({
      data: createJobCategoryDto,
    });
  }

  async findAll(): Promise<JobCategory[]> {
    return await this.prismaService.category.findMany();
  }

  async findOne(id: string): Promise<JobCategory> {
    const category = await this.prismaService.category.findFirst({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category is not found!');
    }

    return category;
  }

  async update(
    id: string,
    updateJobCategoryDto: UpdateJobCategoryDto,
  ): Promise<JobCategory> {
    return await this.prismaService.category.update({
      data: updateJobCategoryDto,
      where: { id },
    });
  }

  async remove(id: string): Promise<JobCategory> {
    return await this.prismaService.category.delete({
      where: { id },
    });
  }

  async search(query?: string, page?: number, perPage?: number) {
    const skip = (page - 1) * perPage;
    const categories = await this.prismaService.category.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      skip,
      take: perPage,
    });

    const total = await this.prismaService.category.count();
    const lastPage = Math.ceil(total / perPage);

    const response = {
      items: categories,
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
}
