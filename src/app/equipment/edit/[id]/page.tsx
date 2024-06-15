"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Center from '@/components/Center';
import { instance } from '@/common/axiosConfig';
import { Equipment } from '@prisma/client';
import EquipmentForm from '../../_components/EquipmentForm';


const EditEquipmentPage = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => instance.get<Equipment>('/api/equipment/'+id),
    queryKey: ['equipment_edit']
  });

  if (isLoading)
    return <Center>Loading...</Center>

  if (error)
    return <Center>Error Occurred during fetch</Center>

  return (
    <Center className='text-left'>
      <EquipmentForm equipment={data?.data} />
    </Center>
  )
}

export default EditEquipmentPage