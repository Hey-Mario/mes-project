import { IQualityControlStrategy } from "../interfaces/IQualityControlStrategy";

export class QualityControlStrategySecond implements IQualityControlStrategy {
  execute(data: any): boolean {
    console.log("Executing Quality Control Strategy Second");
    return true;
  }
}
