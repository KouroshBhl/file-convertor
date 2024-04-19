import React from 'react';
import Logo from './ui/Logo';
import Language from './ui/Language';
import Navigation from './ui/Navigation';

export default function Header() {
  return (
    <div className='flex justify-between items-center w-full px-6 py-4 md:w-5/6 lg:w-8/12 mx-auto'>
      <div className='flex items-center gap-24'>
        <Logo />
        <Navigation />
      </div>
      <Language />
    </div>
  );
}
