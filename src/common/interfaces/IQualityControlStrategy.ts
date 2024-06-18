export interface IQualityControlStrategy {
  execute(data: any): boolean;
}
