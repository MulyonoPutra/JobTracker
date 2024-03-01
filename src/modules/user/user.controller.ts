import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUserId } from 'src/common/decorators';
import { AuthGuards } from 'src/common/guards/auth.guard';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(AuthGuards)
  @Get('/detail')
  async findOne(@CurrentUserId() id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @UsePipes(ValidationPipe)
  @Patch('/:id')
  update(@Param('id') userId: string, @Body() body: UpdateUserDto) {
    return this.userService.updated(userId, body);
  }
}
