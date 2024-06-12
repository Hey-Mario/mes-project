class EquipmentMemento {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  getState(): string {
    return this.state;
  }
}

class EquipmentOriginator {
  private state: string;

  constructor(state: string) {
    this.state = state;
  }

  setState(state: string) {
    this.state = state;
  }

  saveStateToMemento(): EquipmentMemento {
    return new EquipmentMemento(this.state);
  }

  restoreStateFromMemento(memento: EquipmentMemento) {
    this.state = memento.getState();
  }
}
