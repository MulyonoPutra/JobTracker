import { User } from 'src/modules/user/entities/user.entity';

export class Experience {
  startDate: string;
  endDate: string;
  location: string;
  position: string;
  company: string;
  responsibilities: string;
  user: User;
}
