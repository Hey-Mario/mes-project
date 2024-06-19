import { ApprovalHandler } from "./ApprovalHandler";

export class ManagerApprovalHandler extends ApprovalHandler {
  public handle(request: any): any {
    if (request.amount <= 1000) {
      return `Manager approved the request of ${request.amount}`;
    }
    return super.handle(request);
  }
}
