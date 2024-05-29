import { Button } from '@/components/ui/button'
import { Heading } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const Product = () => {
  return (
    <>
      <Heading size="5">Product</Heading>
      <Button>
        <Link href={"/product/new"}>New Product</Link>
      </Button>
    </>
  )
}

export default Product