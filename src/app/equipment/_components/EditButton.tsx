"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { HiOutlinePencilSquare } from "react-icons/hi2";

interface Props {
  equipmentId: number
}

const EditButton = ({ equipmentId } : Props) => {
  const router = useRouter();
  const onEdit = () => {
    router.push(`/equipment/edit/${equipmentId}`)
  }
  return (
    <HiOutlinePencilSquare onClick={onEdit} color='blue' className='cursor-pointer' />
  )
}

export default EditButton