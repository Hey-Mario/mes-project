export interface IMachine {
  start(): void;
  stop(): void;
  getStatus(): string;
}
