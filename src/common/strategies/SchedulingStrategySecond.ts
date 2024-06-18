import { ISchedulingStrategy } from "../interfaces/ISchedulingStrategy";

export class SchedulingStrategySecond implements ISchedulingStrategy {
  schedule(tasks: any[]): any[] {
    console.log("Scheduling tasks with Strategy Second");
    return tasks;
  }
}
