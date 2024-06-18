import { IQualityControlStrategy } from "../interfaces/IQualityControlStrategy";

export class QualityControlContext {
  private strategy: IQualityControlStrategy;

  constructor(strategy: IQualityControlStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: IQualityControlStrategy) {
    this.strategy = strategy;
  }

  executeStrategy(data: any): boolean {
    return this.strategy.execute(data);
  }
}
