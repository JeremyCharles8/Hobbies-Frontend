export interface IUser {
  id: number;
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: string;
  book: IBook[];
  comic: IComic[];
  boardGame: IBoardGame[];
  created_at: Date;
  updated_at?: Date;
}

export type SigninForm = Pick<IUser, 'email' | 'password'>;
