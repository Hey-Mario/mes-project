import { IMachine } from "../interfaces/IMachine";

export class ComplexMachine {
  private isOperational = false;

  turnOn() {
    console.log('Complex Machine turned on');
  }

  turnOff() {
    console.log('Complex Machine turned off');
  }
}

export class ComplexMachineAdapter implements IMachine {
  private complexMachine: ComplexMachine;
  private running: boolean;

  constructor(complexMachine: ComplexMachine) {
    this.complexMachine = complexMachine;
    this.running = false;
  }

  start(): void {
    this.complexMachine.turnOn();
    this.running = true;
  }

  stop(): void {
    this.complexMachine.turnOff();
    this.running = false;
  }

  getStatus(): string {
    return this.running ? "Complex Machine is running" : "Complex Machine is stopped";
  }
}
