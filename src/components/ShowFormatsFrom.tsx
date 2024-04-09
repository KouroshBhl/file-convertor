import React from 'react';

export default function ShowFormatsFrom({ formats, onClick }) {
  return (
    <ul className='grid grid-cols-3 font-bold'>
      {formats.map((format, id) => {
        return (
          <li
            className={`flex justify-center items-center bg-theme-darkGray_2 px-1 py-2 m-2 rounded hover:cursor-pointer text-wrap`}
            key={id}
            onClick={onClick}
            data-value={format.from}
          >
            {format.from.toUpperCase()}
          </li>
        );
      })}
    </ul>
  );
}
