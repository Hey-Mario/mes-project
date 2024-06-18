import { IMachine, MachineContext } from "../interfaces/IMachine";


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

  handleContext(context: MachineContext) {
    const machineName = this.getName();
    switch(context[machineName]) {
      case 'stopped':
        this.stop();
        break;
      case 'started':
        this.start();
        break;
      default:
        break;
    }
  }

  get isOff() {
    return !this.running;
  }

  get isOn() {
    return this.running;
  }
}
