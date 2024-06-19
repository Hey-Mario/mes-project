import { NextRequest, NextResponse } from "next/server";
import { ApprovalService } from "@/common/services/ApprovalService";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const approvalService = new ApprovalService();
  const result = approvalService.processRequest(data);

  return NextResponse.json({ result });
}
