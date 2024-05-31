import { instance } from '@/common/axiosConfig';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { FiTrash } from "react-icons/fi";

interface Props {
  productId: number;
  onDeleteSuccess?: (productId: number) => void;
}

const DeleteButton = ({ productId, onDeleteSuccess }: Props) => {
  const mutation = useMutation({
    mutationFn: () => instance.delete(`/api/product/${productId}`),
    onSuccess: () => {
      onDeleteSuccess?.(productId);
    },
  });

  const onDelete = () => {
    mutation.mutate();
  };

  return (
    <FiTrash onClick={onDelete} color='red' className='cursor-pointer' />
  );
};

export default DeleteButton;