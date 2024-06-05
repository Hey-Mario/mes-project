import { Equipment } from "@/common/models/Equipment";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const newData = await req.json();

  try {
    const existingEquipment = await prisma.equipment.findUnique({
      where: { id: Number(params.id) },
    });

    if (!existingEquipment) {
      return NextResponse.json(
        { message: "Equipment not Found" },
        { status: 404 }
      );
    }

    const clonedEquipment = new Equipment(
      existingEquipment.name,
      existingEquipment.type,
      existingEquipment.status
    ).clone();

    // Update cloned equipment with new data
    Object.assign(clonedEquipment, newData);

    const createdEquipment = await prisma.equipment.create({
      data: {
        name: clonedEquipment.name,
        type: clonedEquipment.type,
        status: clonedEquipment.status,
      },
    });
    return NextResponse.json(
      { message: "Equipment cloned successfully", createdEquipment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
