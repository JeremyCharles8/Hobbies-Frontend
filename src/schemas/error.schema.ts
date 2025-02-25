import z from 'zod';

export const errorDataSchema = z.object({
  error: z.string(),
});
