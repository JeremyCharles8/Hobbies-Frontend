import { useQuery } from '@tanstack/react-query';

import userProfileSchema from '../schemas/userProfile.schema';
import { UserProfile } from '../types/user.type';
import { ErrorData } from '../types/error.type';

const apiUrl: string = import.meta.env.VITE_API_URL;

const getUser = async () => {
  const response = await fetch(`${apiUrl}/users/profile`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    const errorData: ErrorData = await response.json();
    throw new Error(errorData.error);
  }

  const data: UserProfile = await response.json();

  return userProfileSchema.parse(data);
};

export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
  });
};
