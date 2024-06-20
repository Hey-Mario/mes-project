import { MachineState } from './MachineState';
import { MachineContext } from './MachineContext';

export class MaintenanceState extends MachineState {
  start(machineContext: MachineContext): void {
    console.log("Cannot start machine while under maintenance.");
  }

  stop(machineContext: MachineContext): void {
    console.log("Machine is already stopped for maintenance.");
  }

  performMaintenance(machineContext: MachineContext): void {
    console.log("Performing maintenance.");
    machineContext.setState(machineContext.getStoppedState());
  }

  getStatus(): string {
    return "Maintenance";
  }
}
