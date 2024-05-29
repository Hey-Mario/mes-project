"use client";

import AutoForm from '@/components/ui/auto-form'
import { createProductSchema } from '@/schema/product';
import React from 'react'

const NewProductPage = () => {

  return (
    <div>
      <AutoForm
        formSchema={createProductSchema}
      ></AutoForm>
    </div>
  )
}

export default NewProductPage