import { IVisitor } from "../../interfaces/IVisitor";
import { Machine } from "../visitor/Machine";
import { Equipment } from "../visitor/Equipment";

export class MaintenanceVisitor implements IVisitor {
    visitMachine(machine: Machine): void {
        console.log(`Performing maintenance on machine ${machine.name} with status ${machine.status}`);
        
        
        machine.performMaintenance();
        machine.replaceWornParts();
        machine.resetRuntimeHours();
    }

    visitEquipment(equipment: Equipment): void {
        console.log(`Inspecting equipment ${equipment.type} with condition ${equipment.condition}`);
        
      
        equipment.inspect();
        if (equipment.usageCount > 100) {
            equipment.updateCondition("Needs Repair");
        } else {
            equipment.updateCondition("Good");
        }
        equipment.recordInspection();
    }
}
