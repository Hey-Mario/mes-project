import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { createProductSchema } from '../../../schema/product';
import { ProductBuilder } from '@/builders/ProductBuilder';

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data)
    
    const validation = createProductSchema.safeParse(data);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 422 });

    const productData = new ProductBuilder(data.name)
      .setDescription(data.description)
      .build();
    const product = await prisma.product.create({ data: productData });
    return NextResponse.json(product, { status : 201});
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}