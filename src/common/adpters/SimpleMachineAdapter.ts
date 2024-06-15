import { MachineBase } from "../bases/MachineBase";

export class SimpleMachine {
  private label: string;
  constructor(label: string) {
    this.label = label;
  }

  powerOn() {
    console.log('Simple Machine powered on');
  }

  powerOff() {
    console.log('Simple Machine powered off');
  }

  getLabel() {
    return this.label;
  }
}

export class SimpleMachineAdapter extends MachineBase {
  private simpleMachine: SimpleMachine;

  constructor(simpleMachine: SimpleMachine) {
    super();
    this.simpleMachine = simpleMachine;
  }

  start(): void {
    this.simpleMachine.powerOn();
    this.running = true;
  }

  stop(): void {
    this.simpleMachine.powerOff();
    this.running = false;
  }

  getName(): string {
    return this.simpleMachine.getLabel();
  }
}
