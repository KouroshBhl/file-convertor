import React, { ReactNode } from 'react';
import { FaGoogleDrive } from 'react-icons/fa';
import { FaDropbox } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa6';

type ButtonProps = {
  children: ReactNode;
  isSelector: boolean;
  onClick: () => void;
};

export default function Button({ children, isSelector, onClick }: ButtonProps) {
  return (
    <div className='flex justify-between text-theme-white font-semibold text-base'>
      <button
        type='button'
        className='bg-theme-fontRed_2 px-10 py-4 hover:bg-theme-fontRed_1 rounded-l-md transition-all duration-300'
        onClick={onClick}
      >
        {children}
      </button>

      {isSelector && (
        <>
          <LinkButton isRounded={false}>
            <FaGoogleDrive />
          </LinkButton>
          <LinkButton isRounded={false}>
            <FaDropbox />
          </LinkButton>
          <LinkButton isRounded={true}>
            <FaLink />
          </LinkButton>
        </>
      )}
    </div>
  );
}

function LinkButton({ children, isRounded }) {
  return (
    <button
      className={`font-bold bg-theme-fontRed px-4 py-2 bg-theme-fontRed_2 hover:bg-theme-fontRed_1 ${
        isRounded === true ? 'rounded-r-md' : ''
      } transition-all duration-300`}
    >
      {children}
    </button>
  );
}
