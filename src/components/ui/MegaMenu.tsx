import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import megaMenuData from '../../../public/static/megaMenuData.json';

type MegaMenuProps = {
  setIsMegamenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MegaMenu({ setIsMegamenuOpen }: MegaMenuProps) {
  return (
    <div className='w-full bg-white mt-1 absolute top-32 md:top-16 left-0 z-20 p-4 grid md:grid-cols-[1fr,1fr,1fr,1fr,1fr] font-medium'>
      {megaMenuData.map((list, index) => {
        return (
          <div key={index} className='mb-10 md:mb-0'>
            <ul className='flex flex-col gap-3'>
              <li className=' flex items-center gap-2 font-semibold'>
                <Image
                  width={20}
                  height={30}
                  alt='icon'
                  src={`/static/icons/${list.icon}.svg`}
                />
                <h3 className='text-gray-600 text-base'>{list.header}</h3>
              </li>
              <hr />
              {list.items.map((item, index) => {
                return (
                  <li key={index} className='ml-8 text-gray-700'>
                    <Link
                      href={item.link}
                      onClick={() => setIsMegamenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
