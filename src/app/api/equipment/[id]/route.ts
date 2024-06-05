import { UpdateEquipmentCommand } from "@/common/commands/equipment/UpdateEquipmentCommand";
import { Equipment } from "@/common/models/Equipment";
import { errorFormatter } from "@/common/utils";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log("Equipment ID:", id);
    const data = await req.json();

    const updateEquipmentCommand = new UpdateEquipmentCommand(id, data);
    const equipment = await updateEquipmentCommand.execute();

    return NextResponse.json({ message: "Equipment updated successfully", equipment }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(errorFormatter(error), { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    console.log("Equipment ID:", id);

    const equipment = await prisma.equipment.delete({ where: { id: +id } });

    if (!equipment) {
      return NextResponse.json({ message: "Equipment not Found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Equipment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}