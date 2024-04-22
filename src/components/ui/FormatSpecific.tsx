import React, { ReactNode } from 'react';

type FormatSpecificProps = {
  children: ReactNode;
};

export default function FormatSpecific({ children }: FormatSpecificProps) {
  return <b className='text-xl sm:text-2xl md:text-3xl'>{children}</b>;
}
