import { useState } from 'react';
import FormatsContainer from './FormatsContainer';
import Loader from '../ui/Loader';
import { HiMiniChevronRight } from 'react-icons/hi2';
import ShowFormatsFrom from './ShowFormatsFrom';
import SearchFormats from './SearchFormats';
import { useFilePicker } from '../../context/FilePickerContext';
import { useDetectOutside } from '@/utils/hooks/useDetectMouseOutside';

type ConversionPickupProps = {
  uniqueGroup: string[];
  allFormats: any[];
  setFromFormatDetect: (value: string) => void;
  setShowFrom: (value: boolean) => void;
};

function ConversionPickup({
  uniqueGroup,
  allFormats,
  setFromFormatDetect,
  setShowFrom,
}: ConversionPickupProps) {
  const [groupDetect, setGroupDetect] = useState('Microsoft Office');
  const [filterBySearch, setFilterBySearch] = useState([]);
  const ref = useDetectOutside(setShowFrom, false);

  function handleDetectGroupFormat(e: any) {
    setGroupDetect(e.target.getAttribute('data-value'));
  }

  function handleDetectFormat(e: any) {
    setFromFormatDetect(e.target.getAttribute('data-value'));
  }

  const filterByGroup = allFormats.filter((format) => {
    return format.group === groupDetect;
  });

  const uniqueFormatsFrom = Array.from(
    new Set(filterByGroup.map((a) => a.from))
  ).map((from) => {
    return filterByGroup.find((a) => a.from === from);
  });

  return (
    <div ref={ref}>
      <FormatsContainer width='[28rem]'>
        {!uniqueGroup.length ? (
          <Loader />
        ) : (
          <>
            <SearchFormats formats={allFormats} setter={setFilterBySearch} />
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
    </div>
  );
}

export default ConversionPickup;
