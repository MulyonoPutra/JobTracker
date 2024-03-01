import { JobCategory } from 'src/modules/job-category/entities/job-category.entity';

export type ActivityResponseType = {
  id: string;
  position: string;
  location: string;
  jobType: string;
  status: string;
  category: JobCategory;
  jobPosted?: string;
};
