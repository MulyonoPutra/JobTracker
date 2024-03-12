import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { CurrentUserId } from 'src/common/decorators';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  create(
    @Body() createActivityDto: CreateActivityDto,
    @CurrentUserId() userId: string,
  ) {
    return this.activityService.create(createActivityDto, userId);
  }

  @Get()
  findAll(@Query('page') page?: string, @Query('perPage') perPage?: string) {
    const parsedPage = parseInt(page, 10) || 1;
    const parsedPerPage = parseInt(perPage, 10) || 10;

    if (parsedPage < 1 || parsedPerPage < 1) {
      throw new BadRequestException(
        'Page and perPage must be positive integers',
      );
    }
    return this.activityService.findAll(parsedPage, parsedPerPage);
  }

  @Get('filter')
  filterByStatus(
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
    @Query('status') status?: string, // Add status query parameter
  ) {
    const parsedPage = parseInt(page, 10) || 1;
    const parsedPerPage = parseInt(perPage, 10) || 10;

    if (parsedPage < 1 || parsedPerPage < 1) {
      throw new BadRequestException(
        'Page and perPage must be positive integers',
      );
    }
    return this.activityService.filterByStatus(
      parsedPage,
      parsedPerPage,
      status,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
