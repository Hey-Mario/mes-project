import { IMachine } from "../interfaces/IMachine";

export class SimpleMachine {
  powerOn() {
    console.log('Simple Machine powered on');
  }

  powerOff() {
    console.log('Simple Machine powered off');
  }
}

export class SimpleMachineAdapter implements IMachine {
  private simpleMachine: SimpleMachine;
  private running: boolean;

  constructor(simpleMachine: SimpleMachine) {
    this.simpleMachine = simpleMachine;
    this.running = false;
  }

  start(): void {
    this.simpleMachine.powerOn();
    this.running = true;
  }

  stop(): void {
    this.simpleMachine.powerOff();
    this.running = false;
  }

  getStatus(): string {
    return this.running ? "Simple Machine is running" : "Simple Machine is stopped";
  }
}
