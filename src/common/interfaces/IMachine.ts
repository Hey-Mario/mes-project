export interface IMachine {
  start(): void;
  stop(): void;
  getName(): string;
  getStatus(): string;
  readonly isOff: boolean;
  readonly isOn: boolean;
}