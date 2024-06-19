export interface IApprovalHandler {
    setNext(handler: IApprovalHandler): IApprovalHandler;
    handle(request: any): any;
  }
  