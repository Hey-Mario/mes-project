import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional()
});
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data)
    
    const validation = createProductSchema.safeParse(data);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 422 });

    const product = await prisma.product.create({ data });
    return NextResponse.json(product, { status : 201});
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}