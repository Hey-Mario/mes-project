import { MachineState } from './MachineState';
import { MachineContext } from './MachineContext';

export class ActiveState extends MachineState {
  start(machineContext: MachineContext): void {
    console.log("Machine is already running.");
  }

  stop(machineContext: MachineContext): void {
    console.log("Stopping the machine.");
    machineContext.setState(machineContext.getStoppedState());
  }

  performMaintenance(machineContext: MachineContext): void {
    console.log("Cannot perform maintenance while machine is running.");
  }

  getStatus(): string {
    return "Active";
  }
}
