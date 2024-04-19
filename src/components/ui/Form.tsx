'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type FormProps = {
  children: ReactNode;
  action?: any;
};

export default function Form({ children, action }: FormProps) {
  const pathName = usePathname();

  if (pathName.includes('about')) return;

  return (
    <form
      action={action}
      className='h-1/4 bg-theme-lightGray w-full flex gap-12 flex-col justify-center items-center py-44'
    >
      {children}
    </form>
  );
}
