"use client";

import Center from '@/components/Center';
import ProductForm from '../_components/ProductForm';


const NewProductPage = () => {
  
  return (
    <Center className='md:w-[90%] w-[90%] max-w-[450px] text-left'>
      <ProductForm />
    </Center>
  )
}

export default NewProductPage