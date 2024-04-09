import React from 'react';

export default function FormatLists({ children, onClick, dataValue }) {
  return (
    <li
      className='flex justify-center items-center bg-theme-darkGray_2 px-1 py-2 m-2 rounded hover:cursor-pointer text-wrap'
      onClick={onClick}
      data-value={dataValue}
    >
      {children}
    </li>
  );
}
