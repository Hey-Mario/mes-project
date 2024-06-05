import { Equipment } from "@prisma/client";

export interface IEquipmentFactory {
  createEquipment(name: string, type?: string): Promise<Equipment>;
}
