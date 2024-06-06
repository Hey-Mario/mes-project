import React from 'react'
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IProductForm, createProductSchema } from '@/schema/product';
import { Spinner } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { instance } from '@/common/axiosConfig';
import { Product } from '@prisma/client';

const ProductForm = ({ product = null }: { product?: Product | null }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: IProductForm) => {
    setIsLoading(true);
    console.log(data);
    try {
      let res = null;
      if (!product) {
        res = await instance.post('/api/product', data);
      } else {
        res = await instance.patch('/api/product/'+product.id, data);
      }
      console.log(res);
      router.push("/product")
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle>{product ? "Edit" : "Create"} product</CardTitle>
        <CardDescription>{product ? "Edit" : "Create"} a product in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <AutoForm
          formSchema={createProductSchema}
          onSubmit={onSubmit}
          fieldConfig={{
            description: {
              fieldType: 'textarea',
            },
          }}
          values={{
            description: product?.description || '',
            name: product?.name || '',
          }}
        >
          <AutoFormSubmit
            disabled={isLoading}
            className='m-auto flex gap-5 min-w-[150px]'
          >
            <span>Save</span>
            { isLoading && <Spinner className=''></Spinner> }
          </AutoFormSubmit>
        </AutoForm>
      </CardContent>
    </Card>
  )
}

export default ProductForm