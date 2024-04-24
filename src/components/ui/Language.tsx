'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useTransition } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

import { options } from '../../../public/static/languageData';
import Image from 'next/image';
import Link from 'next/link';
import { useDetectOutside } from '@/utils/hooks/useDetectMouseOutside';

export default function Language() {
  const path = usePathname();
  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);
  const helperRef = useRef<HTMLDivElement>(null);
  const ref = useDetectOutside(setIsLanguageOpen, true, helperRef);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  const pathName = path.split('/')[2];

  function handleChangeLanguage(value: any) {
    startTransition(() => {
      router.replace(`/${value}`);
    });
  }

  return (
    <div className='relative w-24'>
      <div
        onClick={() => setIsLanguageOpen((prev) => !prev)}
        className='hover:bg-slate-100 cursor-pointer px-2 rounded flex justify-between items-center gap-2 py-2 text-base '
        ref={helperRef}
      >
        <div className='flex justify-center items-center gap-2'>
          <Image
            alt='EN'
            src={`/static/languages/${localActive}.svg`}
            width={25}
            height={20}
          />
          <span className='text-sm text-slate-500 uppercase font-semibold'>
            {localActive}
          </span>
        </div>
        <IoMdArrowDropdown
          className={`${
            isLanguageOpen ? 'rotate-180' : ''
          } transition-all ease-in-out duration-200 transform text-xl text-slate-600`}
        />
      </div>

      {isLanguageOpen && (
        <div
          className='bg-white absolute top-14 w-44 z-50 flex flex-col gap-2 rounded left-1/2 -translate-x-1/2'
          ref={ref}
        >
          {options.map((option, index) => {
            return (
              <Link
                key={index}
                onClick={() => handleChangeLanguage(option.value)}
                href={`/${option.value}${pathName ? `/${pathName}` : ''}`}
                locale={option.value}
                className='grid grid-cols-[1fr,3fr,20px] items-center gap-2 hover:bg-slate-100 py-2 px-4'
              >
                <Image
                  alt={option.label}
                  src={`/static/languages/${option.value}.svg`}
                  width={25}
                  height={20}
                />
                <span className='text-base'>{option.label}</span>
                {option.value === localActive && (
                  <Image
                    src='/static/otherIcons/check.svg'
                    width={20}
                    height={20}
                    alt='check mark icon'
                  />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
