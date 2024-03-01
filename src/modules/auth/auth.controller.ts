import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { Credentials } from './types/credentials.type';
import { LoginDTO } from './dto/login.dto';
import { AuthenticationGuard } from './guards/authentication.guard';
import { Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() body: RegisterDTO): Promise<Credentials> {
    return this.authService.register(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }

  @UseGuards(AuthenticationGuard)
  @Get('profile')
  async findUserById(@Req() request) {
    return await this.authService.findUserById(request.user.id);
  }
}
