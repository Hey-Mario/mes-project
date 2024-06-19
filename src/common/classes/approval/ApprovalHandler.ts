import { IApprovalHandler } from "../../interfaces/IApprovalHandler";

export abstract class ApprovalHandler implements IApprovalHandler {
  private nextHandler: IApprovalHandler | null = null;

  public setNext(handler: IApprovalHandler): IApprovalHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: any): any {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}
