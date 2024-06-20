import { MachineState } from './MachineState';
import { ActiveState } from './ActiveState';
import { MaintenanceState } from './MaintenanceState';
import { StoppedState } from './StoppedState';

export class MachineContext {
  private activeState: MachineState;
  private maintenanceState: MachineState;
  private stoppedState: MachineState;
  private currentState: MachineState;

  constructor() {
    this.activeState = new ActiveState();
    this.maintenanceState = new MaintenanceState();
    this.stoppedState = new StoppedState();
    this.currentState = this.stoppedState;
  }

  setState(state: MachineState): void {
    this.currentState = state;
  }

  getState(): MachineState {
    return this.currentState;
  }

  getActiveState(): MachineState {
    return this.activeState;
  }

  getMaintenanceState(): MachineState {
    return this.maintenanceState;
  }

  getStoppedState(): MachineState {
    return this.stoppedState;
  }

  start(): void {
    this.currentState.start(this);
  }

  stop(): void {
    this.currentState.stop(this);
  }

  performMaintenance(): void {
    this.currentState.performMaintenance(this);
  }

  getStatus(): string {
    return this.currentState.getStatus();
  }
}
