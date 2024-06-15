import { instance } from '@/common/axiosConfig';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { FiTrash } from "react-icons/fi";
import { message } from "antd";

interface Props {
  equipmentId: number;
  onDeleteSuccess?: (equipmentId: number) => void;
}

const DeleteButton = ({ equipmentId, onDeleteSuccess }: Props) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => instance.delete(`/api/equipment/${equipmentId}`),
    onSuccess: () => {
      onDeleteSuccess?.(equipmentId);
    },
  });

  const onDelete = async () => {
    try {
      await mutateAsync();
      message.success('Equipment deleted successfully')
    } catch {
      message.error('Unabled to delete equipment')
    }
  };

  return (
    <FiTrash onClick={onDelete} color='red' className='cursor-pointer' />
  );
};

export default DeleteButton;