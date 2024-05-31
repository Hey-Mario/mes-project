import React from 'react'
import { FiTrash } from "react-icons/fi";

interface Props {
  productId: number
}

const DeleteButton = ({ productId } : Props) => {
  const onDelete = () => {
    console.log("deleting", productId)
  }
  return (
    <FiTrash onClick={onDelete} color='red' className='cursor-pointer' />
  )
}

export default DeleteButton
