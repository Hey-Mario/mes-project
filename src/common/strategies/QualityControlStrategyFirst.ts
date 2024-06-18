import { IQualityControlStrategy } from "../interfaces/IQualityControlStrategy";

export class QualityControlStrategyFirst implements IQualityControlStrategy {
  execute(data: any): boolean {
    console.log("Executing Quality Control Strategy First");
    return true;
  }
}
