"use client"

import { instance } from '@/common/axiosConfig'
import Center from '@/components/Center'
import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client'
import { Heading, Table } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import DeleteButton from './_components/DeleteButton'
import EditButton from './_components/EditButton'

const ProductPage = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryFn: () => instance.get<Product[]>('/api/product'),
    queryKey: ['product']
  });

  if (isLoading)
    return <Center>Loading...</Center>

  if (error)
    return <div>Error Occurred during fetch</div>

  const handleDeleteSuccess = (productId: number) => {
    // if (data) {
    //   data.data = data.data.filter(product => product.id !== productId);
    //   console.log(data.data)
    // }
    refetch();
  };

  return (
    <Center>
      <div className='flex w-full justify-between items-center mb-5'>
        <Heading size="5">Product</Heading>
        <Button>
          <Link href={"/product/new"}>New Product</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Creation Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {
          data?.data.map(product => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.description}</Table.Cell>
              <Table.Cell>{(new Date(product.createdAt)).toLocaleString()}</Table.Cell>
              <Table.Cell>
                <div className='flex justify-around'>
                  <DeleteButton productId={product.id} onDeleteSuccess={handleDeleteSuccess} />
                  <EditButton productId={product.id} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))
        }
        </Table.Body>
      </Table.Root>
    </Center>
  )
}

export default ProductPage