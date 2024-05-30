import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
}

const Center = ({ className, children }: Props) => {
  return (
    <div className='flex h-screen items-center'>
      <div className={cn('md:w-1/2 w-[80%] mx-auto', className)}>
        {children}
      </div>
    </div>
  )
}

export default Center