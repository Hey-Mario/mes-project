import { EquipmentBuilder } from '@/common/builders/EquipmentBuilder';
import { prisma } from '@/lib/prisma';
import { createEquipmentSchema } from '@/schema/equipment';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const equipments = await prisma.equipment.findMany();
    return NextResponse.json(equipments);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);

    const validation = createEquipmentSchema.safeParse(data);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 422 });

    const equipmentData = new EquipmentBuilder(
      data.name,
      data.type,
      data.status
    ).build();
    const equipment = await prisma.equipment.create({ data: equipmentData });
    return NextResponse.json(equipment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}