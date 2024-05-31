import { prisma } from '@/lib/prisma';
import { ICommand } from './../ICommand';
import { toString } from '@/common/utils';

export class UpdateProductCommand implements ICommand {
  private id: string;
  private data: any;

  constructor(id: string, data: any) {
    this.id = id;
    this.data = data;
  }

  async execute(): Promise<any> {
    try {
      const product = await prisma.product.update({
        where: { id: +this.id },
        data: this.data,
      });
      return product;
    } catch (error: any) {
      throw error;
    }
  }
}