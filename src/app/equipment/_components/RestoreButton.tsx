import { instance } from "@/common/axiosConfig";
import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { message } from "antd";
import { EquipmentService } from "@/common/services/EquipmentService";

interface Props {
  equipmentId: number;
  onRestoreSuccess?: (equipmentId: number) => void;
}

const RestoreButton = ({ equipmentId, onRestoreSuccess }: Props) => {
  const equipmentService = new EquipmentService();
  const handleRestoreState = async () => {
    const equipmentStates = equipmentService.getEquipmentStates();
    if (equipmentId && equipmentStates[equipmentId]) {
      const equipment = equipmentStates[equipmentId];
      await instance.patch("/api/equipment/" + equipmentId, equipment);
      equipmentService.removeEquipmentState(equipmentId);
      onRestoreSuccess?.(equipmentId);
    }
  };

  const onRestore = async () => {
    try {
      await handleRestoreState();
      message.success("Equipment restored successfully");
    } catch {
      message.error("Unabled to restore equipment");
    }
  };

  return (
    <FiRefreshCcw
      onClick={onRestore}
      color="black"
      className="cursor-pointer"
    />
  );
};

export default RestoreButton;
