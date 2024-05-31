import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional()
});

export type IProductForm = z.infer<typeof createProductSchema>;
