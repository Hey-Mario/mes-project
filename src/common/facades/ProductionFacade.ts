import { InventoryManagement } from "./InventoryManagement";
import { OrderProcessing } from "./OrderProcessing";

export class ProductionFacade {
  private inventory: InventoryManagement;
  private orders: OrderProcessing;

  constructor() {
    this.inventory = new InventoryManagement();
    this.orders = new OrderProcessing();
  }

  processOrderAndStock() {
    this.inventory.checkStock();
    this.orders.processOrder();
    this.inventory.updateStock();
    this.orders.generateInvoice();
  }
}
