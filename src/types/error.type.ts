import { z } from 'zod';
import { errorDataSchema } from '../schemas/error.schema';

export type ErrorData = z.infer<typeof errorDataSchema>;
