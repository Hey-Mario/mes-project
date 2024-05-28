import { prisma } from '@/lib/prisma';
import Joi from 'joi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional()
});
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data)
    
    const { error } = productSchema.validate(data);
    if (error) return NextResponse.json(error);

    const product = await prisma.product.create({ data });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}