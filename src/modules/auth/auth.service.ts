import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { ConfigService } from '@nestjs/config';
import { Credentials } from './types/credentials.type';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(data: RegisterDTO): Promise<Credentials> {
    const password = await hash(data.password, 12);
    const user = await this.prismaService.user
      .create({
        data: {
          name: data.name,
          email: data.email,
          password,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getToken(user.id, user.email);

    return tokens;
  }

  async login(data: LoginDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    const passwordMatches = await compare(data.password, user.password);
    if (!passwordMatches) {
      throw new HttpException(
        'Invalid email or password!',
        HttpStatus.FORBIDDEN,
      );
    }

    const tokens = await this.getToken(user.id, user.email);

    return tokens;
  }

  async findUserById(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Successfully Retrieve',
      data: user,
    };
  }

  async getToken(userId: string, email: string): Promise<Credentials> {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email: email,
      },
      {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '7d',
      },
    );

    return {
      accessToken,
    };
  }
}
