import { IIterator } from "@/common/interfaces/IIterator";


export class Order {
    constructor(
      public orderNumber: string,
      public productId: string,
      public quantity: number,
      public status: string
    ) {}
  }
  
  export class OrderIterator implements IIterator<Order> {
    private orders: Order[];
    private position: number = 0;
  
    constructor(orders: Order[]) {
      this.orders = orders;
    }
  
    public current(): Order {
      return this.orders[this.position];
    }
  
    public next(): Order {
      const item = this.orders[this.position];
      this.position += 1;
      return item;
    }
  
    public key(): number {
      return this.position;
    }
  
    public valid(): boolean {
      return this.position < this.orders.length;
    }
  
    public rewind(): void {
      this.position = 0;
    }
  }
  