import React, { ReactNode } from 'react';
import { FaGoogleDrive } from 'react-icons/fa';
import { FaDropbox } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa6';

type ButtonProps = {
  children: ReactNode;
  isSelector: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: HTMLButtonElement['type'];
  className?: React.ComponentProps<'div'>['className'];
};

type LinkButtonProps = {
  children: ReactNode;
  isRounded: boolean;
};

export default function Button({
  children,
  isSelector,
  onClick,
  disabled,
  type,
  className,
}: ButtonProps) {
  return (
    <div
      className={`${className} flex justify-between text-theme-white font-semibold text-base w-4/5 sm:w-2/5`}
    >
      <button
        type={type}
        className={`bg-theme-fontRed_2 px-10 py-4 hover:bg-theme-fontRed_1 rounded-l-md ${
          !isSelector ? 'rounded-r-md' : ''
        } transition-all duration-300 disabled:bg-theme-fontRed_1 disabled:cursor-not-allowed w-full`}
        onClick={onClick}
        disabled={disabled}
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

function LinkButton({ children, isRounded }: LinkButtonProps) {
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
