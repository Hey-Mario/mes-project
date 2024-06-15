import { IMachine } from "../interfaces/IMachine";


export abstract class MachineBase implements IMachine {
  protected running: boolean;

  constructor() {
    this.running = false;
  }

  abstract start(): void;
  abstract stop(): void;
  abstract getName(): string;

  getStatus(): string {
    return this.getName() + (this.running ? " is running" : " is stopped");
  }

  get isOff() {
    return !this.running;
  }

  get isOn() {
    return this.running;
  }
}
