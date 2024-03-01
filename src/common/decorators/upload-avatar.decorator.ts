import {
  Post,
  UseGuards,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';

import { AuthGuards } from '../guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export function UploadAvatarDecorator() {
  return applyDecorators(
    UseGuards(AuthGuards),
    UseInterceptors(
      FileInterceptor('avatar', {
        storage: diskStorage({
          destination: 'public/uploads/image',
          filename: (req, file, cb) => {
            cb(null, file.originalname);
          },
        }),
      }),
    ),
    Post('avatar'),
  );
}
