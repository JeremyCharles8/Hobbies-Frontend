import { useQuery } from '@tanstack/react-query';

const apiUrl: string = import.meta.env.VITE_API_URL;

const getUser = async () => {
  console.log('exécution du fecth');

  const response = await fetch(`${apiUrl}/users/`, {
    method: 'GET',
    credentials: 'include',
  });
  //TODO data type as result or error + validation
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const useUserData = () => {
  console.log('Hook useUserData');

  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
  });
};
