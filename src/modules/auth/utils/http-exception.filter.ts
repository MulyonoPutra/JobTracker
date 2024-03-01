import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const dateFormatter = new Intl.DateTimeFormat('id', {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
      year: 'numeric',
    });

    const currentDate = new Date();
    response.status(status).json({
      statusCode: status,
      timestamp: dateFormatter.format(currentDate),
      // path: request.url,
      message: exception.getResponse(),
    });
  }
}
