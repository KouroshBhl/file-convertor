import React from 'react';
import { HiMiniChevronDown } from 'react-icons/hi2';

type ButtonProps = {
  name: string;
  isSelector: boolean;
};

export default function Button({ name, isSelector }: ButtonProps) {
  return (
    <div className='flex justify-between text-theme-white font-medium'>
      <button
        type='button'
        className='bg-theme-purplePrimary px-8 py-2 hover:bg-theme-accentPurple rounded-l-md transition-all duration-300'
      >
        {name}
      </button>

      {isSelector && (
        <button className='font-bold bg-theme-purplePrimary px-4 py-2 hover:bg-theme-accentPurple rounded-r-md transition-all duration-300'>
          <HiMiniChevronDown />
        </button>
      )}
    </div>
  );
}
