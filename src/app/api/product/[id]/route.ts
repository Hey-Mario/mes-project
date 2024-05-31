import { UpdateProductCommand } from "@/common/commands/product/UpdateProductCommand";
import { errorFormatter } from "@/common/utils";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log("Product ID:", id);
    const data = await req.json();

    const updateProductCommand = new UpdateProductCommand(id, data);
    const product = await updateProductCommand.execute();

    return NextResponse.json({ message: "Product updated successfully", product }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(errorFormatter(error), { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log("Product ID:", id);

    const product = await prisma.product.delete({ where: { id: +id } });

    if (!product) {
      return NextResponse.json({ message: "Product not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}