import { prisma } from '@/lib/prisma';
import { ICommand } from './../ICommand';

export class UpdateEquipmentCommand implements ICommand {
  private id: string;
  private data: any;

  constructor(id: string, data: any) {
    this.id = id;
    this.data = data;
  }

  async execute(): Promise<any> {
    try {
      const equipment = await prisma.equipment.update({
        where: { id: +this.id },
        data: this.data,
      });
      return equipment;
    } catch (error: any) {
      throw error;
    }
  }
}
