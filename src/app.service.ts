import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcome() {
    return {
      'category endpoint': 'http://localhost:3000/category',
      'activity endpoint': 'http://localhost:3000/activity',
    };
  }
}
