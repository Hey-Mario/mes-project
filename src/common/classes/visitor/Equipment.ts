import { IVisitable } from "../../interfaces/IVisitable";
import { IVisitor } from "../../interfaces/IVisitor";

export class Equipment implements IVisitable {
    constructor(public type: string, public condition: string, public usageCount: number) {}

    accept(visitor: IVisitor): void {
        visitor.visitEquipment(this);
    }

    inspect(): void {
        console.log(`Inspection completed for ${this.type}.`);
    }

    updateCondition(newCondition: string): void {
        this.condition = newCondition;
        console.log(`Condition updated to ${this.condition} for ${this.type}.`);
    }

    recordInspection(): void {
        console.log(`Inspection results recorded for ${this.type}.`);
    }
}
