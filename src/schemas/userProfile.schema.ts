import z from 'zod';

const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  volume: z.number(),
  serie: z.string(),
  type: z.string(),
});

const comicSchema = z.object({
  id: z.number(),
  title: z.string(),
  volume: z.number(),
  serie: z.string(),
  type: z.string(),
});

const boardGameSchema = z.object({
  id: z.number(),
  title: z.string(),
});

const userProfilSchema = z.object({
  nickname: z.string(),
  email: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  book: z.array(bookSchema),
  comic: z.array(comicSchema),
  boardGame: z.array(boardGameSchema),
});

export default userProfilSchema;
