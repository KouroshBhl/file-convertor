'use client';

import React from 'react';
import Logo from './ui/Logo';
import Language from './ui/Language';
import Navigation from './ui/Navigation';
import MenuButton from './ui/MenuButton';

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className='flex items-center w-full px-6 h-16 2xl:w-8/12 mx-auto relative'>
      <nav className='flex justify-between items-center w-[92%]  mx-auto'>
        <Logo />
        <div
          className={`duration-500 ${
            isOpen
              ? 'md:static absolute bg-white md:min-h-fit min-h-[80vh] left-0 top-16 md:w-auto w-full'
              : 'hidden md:flex md:items-center md:w-auto w-full md:min-h-fit min-h-[80vh] md:top-0 bg-white md:bg-transparent '
          }  flex  justify-center px-5 z-30`}
        >
          <Navigation />
        </div>
        <Language />
        <MenuButton isOpen={isOpen} handleClick={handleClick} />
      </nav>
    </header>
  );
}
