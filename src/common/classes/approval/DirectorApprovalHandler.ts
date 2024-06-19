import { ApprovalHandler } from "./ApprovalHandler";

export class DirectorApprovalHandler extends ApprovalHandler {
  public handle(request: any): any {
    if (request.amount <= 10000) {
      return `Director approved the request of ${request.amount}`;
    }
    return super.handle(request);
  }
}
