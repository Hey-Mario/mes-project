"use client";

import { instance } from '@/common/axiosConfig';
import Center from '@/components/Center';
import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductForm, createProductSchema } from '@/schema/product';
import { Heading, Spinner } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { UseFormReturn } from 'react-hook-form';

const NewProductPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isValid, setIsValid] = useState<boolean>(false);
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

  // const onFormChange = (event: UseFormReturn) => {
  //   console.log(event.formState.isValid)
  //   setIsValid(event.formState.isValid)
  // }

  return (
    <Center className='md:w-[90%] w-[90%] max-w-[450px]'>
      <Card>
        <CardHeader>
          <CardTitle>Create product</CardTitle>
          <CardDescription>Create a new product in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <AutoForm
            formSchema={createProductSchema}
            onSubmit={onSubmit}
            // onFormChange={onFormChange}
            fieldConfig={{
              description: {
                fieldType: 'textarea'
              },
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
        </CardContent>
      </Card>
    </Center>
  )
}

export default NewProductPage