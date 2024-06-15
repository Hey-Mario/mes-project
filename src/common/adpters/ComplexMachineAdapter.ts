import { MachineBase } from "../interfaces/IMachine";

export class ComplexMachine {
  private mark: string;
  constructor(mark: string) {
    this.mark = mark;
  }

  turnOn() {
    console.log('Complex Machine turned on');
  }

  turnOff() {
    console.log('Complex Machine turned off');
  }

  getMark() {
    return this.mark;
  }
}

export class ComplexMachineAdapter extends MachineBase {
  private complexMachine: ComplexMachine;

  constructor(complexMachine: ComplexMachine) {
    super();
    this.complexMachine = complexMachine;
  }

  start(): void {
    this.complexMachine.turnOn();
    this.running = true;
  }

  stop(): void {
    this.complexMachine.turnOff();
    this.running = false;
  }

  getName(): string {
    return this.complexMachine.getMark()
  }
}
