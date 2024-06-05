import { Order } from "@prisma/client";
import { IOrderFactory } from "../interfaces/IOrderFactory";
import { prisma } from "@/lib/prisma";

export class OrderFactory implements IOrderFactory {
  async createOrder(status: string, details: any): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        orderNumber: details.orderNumber,
        productId: details.productId,
        quantity: details.quantity,
        status: status,
      },
    });
    return order;
  }
}
