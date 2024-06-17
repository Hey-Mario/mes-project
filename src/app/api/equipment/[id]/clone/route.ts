import { Equipment } from "@/common/models/Equipment";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ProductionManager } from "@/common/Production/ProductionManager";
import { FoodProductionProcess } from "@/common/Production/FoodProductionProcess";
import { CarProductionProcess } from "@/common/Production/CarProductionProcess";
import { IProductionProcess } from "@/common/interfaces/IProductionProcess";

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

    let productionProcess: IProductionProcess | null = null;
    if (existingEquipment.type === 'Food') {
        productionProcess = new FoodProductionProcess();
    } else if (existingEquipment.type === 'Car') {
        productionProcess = new CarProductionProcess();
    }

    if (!productionProcess) {
      return NextResponse.json(
        { message: "No suitable production process found for this equipment type" },
        { status: 400 }
      );
    }

    const productionManager = new ProductionManager(productionProcess);
    productionManager.startProduction();

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

    productionManager.endProduction();

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