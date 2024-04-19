import Link from 'next/link';
import React, { ReactNode } from 'react';

type FormatLists = {
  children: ReactNode;
  onClick?: () => void;
  to: any;
};

export default function FormatLists({ children, onClick, to }: FormatLists) {
  return (
    <Link
      href={to}
      className='flex justify-center items-center bg-theme-darkGray_2 px-1 py-2 m-2 rounded hover:cursor-pointer text-wrap'
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
