import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link href='/'>
      <Image src='/logo.svg' alt='logo' width={60} height={40} />
    </Link>
  );
}
