import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  // ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { JobCategoryService } from './job-category.service';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { JobCategory } from './entities/job-category.entity';

@Controller('category')
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Post()
  create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryService.create(createJobCategoryDto);
  }

  @Get()
  async findAll(): Promise<JobCategory[]> {
    return await this.jobCategoryService.findAll();
  }

  @Get('search')
  async search(
    @Query('query') query?: string,
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
  ) {
    const parsedPage = parseInt(page, 10) || 1;
    const parsedPerPage = parseInt(perPage, 10) || 10;

    if (parsedPage < 1 || parsedPerPage < 1) {
      throw new BadRequestException(
        'Page and perPage must be positive integers',
      );
    }
    return await this.jobCategoryService.search(
      query,
      parsedPage,
      parsedPerPage,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<JobCategory> {
    return await this.jobCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoryService.update(id, updateJobCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobCategoryService.remove(id);
  }
}
