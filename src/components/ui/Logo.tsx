import Image from 'next/image';
import React from 'react';

export default function Logo() {
  return (
    <div>
      <Image src='/logo.svg' alt='logo' width={60} height={40} />
    </div>
  );
}
