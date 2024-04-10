import React, { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

export default function SearchFormats({ formats, setter, initState }) {
  const [isFoundFormat, setIsFoundFormat] = useState(true);

  function handleSearch(e) {
    const inputValue = e.target.value;
    if (!inputValue) setter(initState ? formats : []);

    const filterBySearch = formats.filter((format) => {
      if (format.from) return format.from.includes(inputValue);
      return format.includes(inputValue);
    });

    const uniqueFormatsBySearch = Array.from(
      new Set(filterBySearch.map((a) => a.from))
    ).map((from) => {
      return filterBySearch.find((a) => a.from === from);
    });

    if (uniqueFormatsBySearch.length === 0) setIsFoundFormat(false);
    if (uniqueFormatsBySearch.length !== 0) setIsFoundFormat(true);

    if (inputValue) setter(uniqueFormatsBySearch);
  }
  return (
    <div className='flex flex-col  items-center'>
      <div className='flex justify-center items-center relative w-full'>
        <IoIosSearch className='absolute left-2 text-lg' />
        <input
          type='text'
          className='w-full py-2 px-8 bg-theme-bgDark_3 rounded font-bold capitalize'
          placeholder='Search format'
          onChange={handleSearch}
        />
      </div>
      {!isFoundFormat && <p className='m-4'>Format not found</p>}
    </div>
  );
}
