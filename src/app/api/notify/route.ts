import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, event } = await req.json();

    console.log(`Notification for ${name}: ${event}`);

    return NextResponse.json({ message: 'Notification received' }, { status : 200});
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}