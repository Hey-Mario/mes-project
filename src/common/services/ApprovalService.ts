import { ManagerApprovalHandler } from "../classes/approval/ManagerApprovalHandler";
import { DirectorApprovalHandler } from "../classes/approval/DirectorApprovalHandler";
import { VPApprovalHandler } from "../classes/approval/VPApprovalHandler";

export class ApprovalService {
  private handler: ManagerApprovalHandler;

  constructor() {
    this.handler = new ManagerApprovalHandler();
    const director = new DirectorApprovalHandler();
    const vp = new VPApprovalHandler();

    this.handler.setNext(director).setNext(vp);
  }

  public processRequest(request: any): any {
    return this.handler.handle(request);
  }
}
