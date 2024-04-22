'use client';

import React, { ReactNode } from 'react';

type FormProps = {
  children: ReactNode;
  action?: any;
};

export default function Form({ children, action }: FormProps) {
  return (
    <form
      action={action}
      className='h-1/4 bg-theme-lightGray w-full flex gap-12 flex-col justify-center items-center py-44'
    >
      {children}
    </form>
  );
}
