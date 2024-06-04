export class EquipmentBuilder {
  private name: string;
  private type: string;
  private status: string;

  constructor(name: string, type: string, status: string) {
    this.name = name;
    this.type = type;
    this.status = status;
  }

  setName(name: string): EquipmentBuilder {
    this.name = name;
    return this;
  }

  setType(type: string): EquipmentBuilder {
    this.type = type;
    return this;
  }

  setStatus(status: string): EquipmentBuilder {
    this.status = status;
    return this;
  }

  build() {
    return {
      name: this.name,
      type: this.type,
      status: this.status
    };
  }
}