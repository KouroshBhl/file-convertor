import Link from 'next/link';
import React from 'react';

export default function Navigation() {
  return (
    <div>
      <ul className='flex gap-12'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li> <Link href='/'>Tools</Link></li>
        <li> <Link href='/'>About</Link></li>
        <li> <Link href='/'>...</Link></li>
      </ul>
    </div>
  );
}
