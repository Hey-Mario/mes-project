import { EquipmentFactory } from '@/common/factories/EquipmentFactory';
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

    const equipmentFactory = new EquipmentFactory();
    const equipment = await equipmentFactory.createEquipment(data.name, data.type);
    return NextResponse.json(equipment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}