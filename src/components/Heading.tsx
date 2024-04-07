import Image from 'next/image';
import React, { ReactNode } from 'react';

type HeadingProps = {
  title: string;
};

export default function Heading({ title }: HeadingProps) {
  return (
    <div className='flex flex-col justify-center items-center gap-10'>
      <h1 className='font-bold text-6xl'>{title}</h1>
      <Image
        src='/heading-underline.svg'
        alt='underline for heading'
        width={600}
        height={500}
      />
    </div>
  );
}
