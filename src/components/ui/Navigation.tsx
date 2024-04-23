'use client';

import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';

import React, { useRef } from 'react';
import MegaMenu from './MegaMenu';
import { useDetectOutside } from '@/utils/hooks/useDetectMouseOutside';
import Language from './Language';

export default function Navigation() {
  const [isMegamenuOpen, setIsMegamenuOpen] = React.useState(false);
  const helpRef = useRef(null);
  const ref = useDetectOutside(setIsMegamenuOpen, true, helpRef);

  return (
    <>
      <ul className='flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 text-base font-semibold mt-12 md:mt-0 '>
        <li className='md:hidden'>
          <Link href='/'>Home</Link>
        </li>
        <li
          className='flex items-center gap-1 justify-center cursor-pointer'
          onMouseEnter={() => setIsMegamenuOpen(true)}
          ref={helpRef}
        >
          <span>Tools</span>
          <IoIosArrowDown className='text-theme-purplePrimary' />

          {isMegamenuOpen && (
            <div ref={ref} onMouseLeave={() => setIsMegamenuOpen(false)}>
              <MegaMenu setIsMegamenuOpen={setIsMegamenuOpen} />
            </div>
          )}
        </li>

        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
          <Link href='/'>...</Link>
        </li>
      </ul>
    </>
  );
}
