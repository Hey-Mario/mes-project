import { IMediator } from "../interfaces/IMediator";
import { ResourcePlanning } from "@prisma/client";
import { Equipment } from "@prisma/client";

export class ProductionMediator implements IMediator {
  constructor(
    private resourcePlanning: ResourcePlanning,
    private equipment: Equipment
  ) {}

  notify(sender: object, event: string) {
    // Logic to handle notifications
    if (event === "ResourceUpdated") {
      console.log("Resource planning updated, notify equipment module");
    }
  }
}
