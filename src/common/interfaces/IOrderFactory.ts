import { Order } from "@prisma/client";

export interface IOrderFactory {
  createOrder(status: string, details: any): Promise<Order>;
}
