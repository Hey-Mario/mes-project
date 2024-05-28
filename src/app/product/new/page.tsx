"use client";

import AutoForm from '@/components/ui/auto-form'
import React from 'react'
import { z } from 'zod';

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional()
});

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