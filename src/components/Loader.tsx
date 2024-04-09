import React from 'react';
import { Puff } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className='flex justify-center items-center p-4'>
      <Puff height='40' width='40' color='#6012e1' />
    </div>
  );
}
