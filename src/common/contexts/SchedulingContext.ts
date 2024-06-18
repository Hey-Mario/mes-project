import { ISchedulingStrategy } from "../interfaces/ISchedulingStrategy";

export class SchedulingContext {
  private strategy: ISchedulingStrategy;

  constructor(strategy: ISchedulingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ISchedulingStrategy) {
    this.strategy = strategy;
  }

  executeStrategy(tasks: any[]): any[] {
    return this.strategy.schedule(tasks);
  }
}
