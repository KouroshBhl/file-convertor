import Image from 'next/image';
import React, { ReactNode } from 'react';

type HeadingProps = {
  children: ReactNode;
};

export default function Heading({ children }: HeadingProps) {
  return (
    <div className='flex flex-col w-full justify-center items-center gap-4 absolute top-8 left-1/2 -translate-x-1/2 '>
      <h1 className='font-bold md:text-5xl sm:text-4xl text-3xl tracking-wide'>
        {children}
      </h1>
      <Image
        src='/heading-underline.svg'
        alt='underline for heading'
        width={250}
        height={100}
      />
    </div>
  );
}
