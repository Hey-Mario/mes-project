"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Center from '@/components/Center';
import { instance } from '@/common/axiosConfig';
import { Product } from '@prisma/client';
import ProductForm from '../../_components/ProductForm';


const EditProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => instance.get<Product>('/api/product/'+id),
    queryKey: ['product_edit']
  });

  if (isLoading)
    return <Center>Loading...</Center>

  if (error)
    return <Center>Error Occurred during fetch</Center>

  return (
    <Center className='text-left'>
      <ProductForm product={data?.data} />
    </Center>
  )
}

export default EditProductPage