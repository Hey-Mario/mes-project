import { Machine } from "../classes/visitor/Machine";
import { Equipment } from "../classes/visitor/Equipment";

export interface IVisitor {
    visitMachine(machine: Machine): void;
    visitEquipment(equipment: Equipment): void;
}