import { EquipmentMemento } from "../interfaces/EquipmentMemento";
import Cookies from 'js-cookie';

export class EquipmentService {
  async saveState(equipment: EquipmentMemento): Promise<void> {
    const equipments = this.getEquipmentStates();
    const newEquipment = { ...equipments, [equipment.id]: equipment };
    Cookies.set("equipmentStates", JSON.stringify(newEquipment), {
      expires: 1,
    });
  }

  getEquipmentStates(): Record<string, number> {
    const equipmentStates = Cookies.get("equipmentStates");
    return equipmentStates ? JSON.parse(equipmentStates) : {};
  }

  removeEquipmentState(equipmentId: number): void {
    const equipment = this.getEquipmentStates();
    delete equipment[equipmentId];
    Cookies.set("equipmentStates", JSON.stringify(equipment), { expires: 1 });
  }
}
