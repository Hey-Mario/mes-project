import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Product = () => {
  return (
    <div>
      Product
      <Button>
        <Link href={"/product/new"}>New Product</Link>
      </Button>
    </div>
  )
}

export default Product