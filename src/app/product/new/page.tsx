"use client";

import { instance } from '@/common/axiosConfig';
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import { ProductForm, createProductSchema } from '@/schema/product';
import { Spinner } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const NewProductPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: ProductForm) => {
    setIsLoading(true);
    console.log(data);
    try {
      const res = await instance.post('/api/product', data);
      console.log(res);
      router.push("/product")
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="md:w-1/2 w-[80%] mx-auto">
      <AutoForm
        formSchema={createProductSchema}
        onSubmit={onSubmit}
        fieldConfig={{
          description: {
            fieldType: 'textarea'
          }
        }}
      >
        <AutoFormSubmit
          disabled={isLoading}
          className='m-auto flex gap-5'
        >
          <span>Save</span>
          { isLoading && <Spinner className=''></Spinner> }
        </AutoFormSubmit>
      </AutoForm>
    </div>
  )
}

export default NewProductPage