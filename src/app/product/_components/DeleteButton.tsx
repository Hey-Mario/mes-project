import { instance } from '@/common/axiosConfig';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { FiTrash } from "react-icons/fi";
import { message } from "antd";

interface Props {
  productId: number;
  onDeleteSuccess?: (productId: number) => void;
}

const DeleteButton = ({ productId, onDeleteSuccess }: Props) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => instance.delete(`/api/product/${productId}`),
    onSuccess: () => {
      onDeleteSuccess?.(productId);
    },
  });

  const onDelete = async () => {
    try {
      await mutateAsync();
      message.success('Product deleted successfully')
    } catch {
      message.error('Unabled to delete product')
    }
  };

  return (
    <FiTrash onClick={onDelete} color='red' className='cursor-pointer' />
  );
};

export default DeleteButton;