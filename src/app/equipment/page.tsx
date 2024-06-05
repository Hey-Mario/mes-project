"use client"

import { instance } from '@/common/axiosConfig';
import Center from '@/components/Center';
import { Equipment } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const EquipmentPage = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => instance.get<Equipment[]>('/api/equipment'),
    queryKey: ['equipment']
  });

  if (isLoading)
    return <Center>Loading...</Center>

  if (error)
    return <div>Error Occurred during fetch</div>

  return (
    <div>EquipmentPage {data?.data.map(equipment => (
      <div key={equipment.id}>{equipment.name}</div>
    ))}</div>
  )
}

export default EquipmentPage;