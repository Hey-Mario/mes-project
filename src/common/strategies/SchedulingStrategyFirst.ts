import { ISchedulingStrategy } from "../interfaces/ISchedulingStrategy";

export class SchedulingStrategyFirst implements ISchedulingStrategy {
  schedule(tasks: any[]): any[] {
    console.log("Scheduling tasks with Strategy First");
    return tasks;
  }
}
