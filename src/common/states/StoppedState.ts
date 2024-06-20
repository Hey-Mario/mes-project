import { MachineState } from './MachineState';
import { MachineContext } from './MachineContext';

export class StoppedState extends MachineState {
  start(machineContext: MachineContext): void {
    console.log("Starting the machine.");
    machineContext.setState(machineContext.getActiveState());
  }

  stop(machineContext: MachineContext): void {
    console.log("Machine is already stopped.");
  }

  performMaintenance(machineContext: MachineContext): void {
    console.log("Starting maintenance.");
    machineContext.setState(machineContext.getMaintenanceState());
  }

  getStatus(): string {
    return "Stopped";
  }
}
