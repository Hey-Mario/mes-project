import { ApprovalHandler } from "./ApprovalHandler";

export class VPApprovalHandler extends ApprovalHandler {
  public handle(request: any): any {
    if (request.amount > 10000) {
      return `VP approved the request of ${request.amount}`;
    }
    return super.handle(request);
  }
}
