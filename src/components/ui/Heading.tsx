import Image from 'next/image';
import React, { ReactNode } from 'react';

type HeadingProps = {
  children: ReactNode;
};

export default function Heading({ children }: HeadingProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-4 absolute top-8 left-1/2 -translate-x-1/2 '>
      <h1 className='font-bold text-6xl tracking-wide'>{children}</h1>
      <Image
        src='/heading-underline.svg'
        alt='underline for heading'
        width={600}
        height={500}
      />
    </div>
  );
}
