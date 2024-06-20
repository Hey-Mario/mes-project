import { IVisitable } from "../../interfaces/IVisitable";
import { IVisitor } from "../../interfaces/IVisitor";

export class Machine implements IVisitable {
    constructor(public name: string, public status: string, public runtimeHours: number) {}

    accept(visitor: IVisitor): void {
        visitor.visitMachine(this);
    }

    performMaintenance(): void {
        this.status = "Under Maintenance";
        console.log(`Maintenance performed on ${this.name}. Status updated to ${this.status}.`);
    }

    replaceWornParts(): void {
        console.log(`Worn parts replaced on ${this.name}.`);
    }

    resetRuntimeHours(): void {
        this.runtimeHours = 0;
        console.log(`Runtime hours reset for ${this.name}.`);
    }
}
