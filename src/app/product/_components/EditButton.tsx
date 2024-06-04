import React from 'react'
import { HiOutlinePencilSquare } from "react-icons/hi2";

interface Props {
  productId: number
}

const EditButton = ({ productId } : Props) => {
  const onEdit = () => {
    console.log("editing", productId)
  }
  return (
    <HiOutlinePencilSquare onClick={onEdit} color='blue' className='cursor-pointer' />
  )
}

export default EditButton