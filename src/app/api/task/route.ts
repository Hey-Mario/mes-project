import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const tasks = await prisma.task.findMany({
      where: { parentId: null },
      include: { subTasks: true },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, parentId } = await req.json();
    const newTask = await prisma.task.create({
      data: {
        name,
        description,
        parentId,
      },
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } 
}