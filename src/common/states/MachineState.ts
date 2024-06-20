import { MachineContext } from './MachineContext';

export abstract class MachineState {
    abstract start(machineContext: MachineContext): void;
    abstract stop(machineContext: MachineContext): void;
    abstract performMaintenance(machineContext: MachineContext): void;
    abstract getStatus(): string;
  }
  