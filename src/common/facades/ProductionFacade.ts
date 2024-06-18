import { InventoryManagement } from "./InventoryManagement";
import { OrderProcessing } from "./OrderProcessing";

class ProductionMediator {
  private inventory: InventoryManagement;
  private orders: OrderProcessing;

  constructor(inventory: InventoryManagement, orders: OrderProcessing) {
    this.inventory = inventory;
    this.orders = orders;
  }

  processOrderAndStock() {
    this.inventory.checkStock();
    this.orders.processOrder();
    this.inventory.updateStock();
    this.orders.generateInvoice();
  }
}

export class ProductionFacade {
  private mediator: ProductionMediator;

  constructor() {
    const inventory = new InventoryManagement();
    const orders = new OrderProcessing();
    this.mediator = new ProductionMediator(inventory, orders);
  }

  processOrderAndStock() {
    this.mediator.processOrderAndStock();
  }
}
