import { ICloneable } from "@/common/interfaces/ICloneable";

export class Equipment implements ICloneable<Equipment> {
  name: string;
  type: string;
  status: string;

  constructor(name: string, type: string, status: string) {
    this.name = name;
    this.type = type;
    this.status = status;
  }

  clone(): Equipment {
    return new Equipment(this.name, this.type, this.status);
  }
}
