"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { HiOutlinePencilSquare } from "react-icons/hi2";

interface Props {
  productId: number
}

const EditButton = ({ productId } : Props) => {
  const router = useRouter();
  const onEdit = () => {
    router.push(`/product/edit/${productId}`)
  }
  return (
    <HiOutlinePencilSquare onClick={onEdit} color='blue' className='cursor-pointer' />
  )
}

export default EditButton