export const activitiesPopulate = {
  id: true,
  companyName: true,
  position: true,
  location: true,
  jobType: true,
  status: true,
  jobPosted: true,
  category: true,
  appliedOn: true,
  platform: true,
  user: {
    select: {
      name: true,
      email: true,
      avatar: true,
    },
  },
};
