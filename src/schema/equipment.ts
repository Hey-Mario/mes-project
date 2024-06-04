import { z } from 'zod';

export const createEquipmentSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  status: z.string().min(1),
});

export type IEquipmentForm = z.infer<typeof createEquipmentSchema>;
