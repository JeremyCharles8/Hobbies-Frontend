import { z } from 'zod';

import userProfileSchema from '../schemas/userProfile.schema';
import { Libraries } from './libraries.type';

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: string;
  book: Libraries[];
  comic: Libraries[];
  boardGame: Libraries[];
  created_at: Date;
  updated_at?: Date;
}

export type SigninForm = Pick<IUser, 'email' | 'password'>;

export type SignupForm = Pick<
  IUser,
  'nickname' | 'email' | 'password' | 'repeatPassword'
>;

export type UserProfile = z.infer<typeof userProfileSchema>;
