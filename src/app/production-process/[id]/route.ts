import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { Order, OrderIterator } from '@/common/classes/production/OrderIterator';

export async function GET() {
  try {
    const orders = await prisma.order.findMany();

    const orderInstances = orders.map(order => new Order(
      order.orderNumber,
      order.productId,
      order.quantity,
      order.status
    ));

    const iterator = new OrderIterator(orderInstances);
    iterator.rewind();

    const processedOrders = [];
    while (iterator.valid()) {
      const order = iterator.current();
      processedOrders.push({
        orderNumber: order.orderNumber,
        productId: order.productId,
        quantity: order.quantity,
        status: order.status
      });
      iterator.next();
    }

    return NextResponse.json({ orders: processedOrders });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
