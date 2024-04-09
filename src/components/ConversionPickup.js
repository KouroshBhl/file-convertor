import { useState } from 'react';
import FormatsContainer from './FormatsContainer';
import Loader from './Loader';
import { HiMiniChevronRight } from 'react-icons/hi2';
import { IoIosSearch } from 'react-icons/io';
import ShowFormatsFrom from './ShowFormatsFrom';

function ConversionPickup({
  uniqueGroup,
  allFormats,
  setFromFormatDetect,
  setShowFrom,
  setShowTo,
}) {
  const [groupDetect, setGroupDetect] = useState('Microsoft Office');
  const [filterBySearch, setFilterBySearch] = useState([]);

  function handleDetectGroupFormat(e) {
    setGroupDetect(e.target.getAttribute('data-value'));
  }

  function handleDetectFormat(e) {
    setFromFormatDetect(e.target.getAttribute('data-value'));
    setShowFrom(false);
  }

  const filterByGroup = allFormats.filter((format) => {
    return format.group === groupDetect;
  });

  const uniqueFormatsFrom = Array.from(
    new Set(filterByGroup.map((a) => a.from))
  ).map((from) => {
    return filterByGroup.find((a) => a.from === from);
  });

  function handleSearch(e) {
    const inputValue = e.target.value;
    if (!inputValue) setFilterBySearch([]);

    const filterBySearch = allFormats.filter((format) => {
      // return e.target.value === format.from;
      // return e.target.value.includes(format.from);
      return format.from.includes(inputValue);
    });

    const uniqueFormatsBySearch = Array.from(
      new Set(filterBySearch.map((a) => a.from))
    ).map((from) => {
      return filterBySearch.find((a) => a.from === from);
    });

    if (inputValue) setFilterBySearch(uniqueFormatsBySearch);
  }

  return (
    <FormatsContainer width='[32rem]'>
      {!uniqueGroup.length ? (
        <Loader />
      ) : (
        <>
          <div className='flex relative items-center'>
            <IoIosSearch className='absolute left-2 text-lg' />
            <input
              type='text'
              className='w-full py-2 px-8 bg-theme-bgDark_3 rounded font-bold capitalize '
              placeholder='Search format'
              onChange={handleSearch}
            />
          </div>
          {filterBySearch.length !== 0 ? (
            <ShowFormatsFrom
              onClick={handleDetectFormat}
              formats={filterBySearch}
            />
          ) : (
            <div className='grid gap-4 grid-cols-[1fr,2fr]'>
              <div className='flex flex-col gap-2 '>
                {uniqueGroup.map((group, i) => {
                  return (
                    <div key={i} className='flex flex-col'>
                      <div
                        data-value={group}
                        className={`flex items-center justify-between hover:cursor-pointer ${
                          groupDetect === group ? 'font-semibold' : ''
                        }`}
                        onMouseOver={handleDetectGroupFormat}
                      >
                        {group}
                        {groupDetect === group && (
                          <HiMiniChevronRight className='font-bold' />
                        )}
                      </div>
                      <hr className='mt-2 text-theme-darkGray_3' />
                    </div>
                  );
                })}
              </div>

              <div>
                <ShowFormatsFrom
                  onClick={handleDetectFormat}
                  formats={uniqueFormatsFrom}
                />
              </div>
            </div>
          )}
        </>
      )}
    </FormatsContainer>
  );
}

export default ConversionPickup;
