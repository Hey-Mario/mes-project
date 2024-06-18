export interface MachineContext {
  [key: string]: string | number;
}

export interface IMachine {
  start(): void;
  stop(): void;
  getName(): string;
  getStatus(): string;
  handleContext(context: MachineContext): void;
  readonly isOff: boolean;
  readonly isOn: boolean;
}