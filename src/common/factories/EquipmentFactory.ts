import { Equipment } from "@prisma/client";
import { IEquipmentFactory } from "../interfaces/IEquipmentFactory";
import { prisma } from "@/lib/prisma";

export class EquipmentFactory implements IEquipmentFactory {
  async createEquipment(
    name: string,
    type: string = "Sport",
    status: string = "Active"
  ): Promise<Equipment> {
    const equipment = await prisma.equipment.create({
      data: {
        name,
        type,
        status,
      },
    });
    return equipment;
  }
}
