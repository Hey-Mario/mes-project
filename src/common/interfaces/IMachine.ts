export interface IMachine {
  isOn: boolean;
  isOff: boolean;
  start(): void;
  stop(): void;
  getStatus(): string;
}
