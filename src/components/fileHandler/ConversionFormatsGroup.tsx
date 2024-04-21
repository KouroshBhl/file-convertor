import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { HiMiniChevronDown } from 'react-icons/hi2';

import { getAllConversions } from '@/utils/actions';
import FormatsContainer from './FormatsContainer';
import ConversionPickup from './ConversionPickup';
import { useDetectOutside } from '@/utils/hooks/useDetectMouseOutside';

export default function ConversionFormatsGroup() {
  const [allFormats, setAllFormats] = useState([]);
  const [fromFormatDetect, setFromFormatDetect] = useState('pdf');
  const [toFormatDetect, setToFormatDetect] = useState('...');
  const [formatTo, setFormatTo] = useState([]);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const ref = useDetectOutside(setShowTo);

  function handleShowFrom() {
    setShowFrom((prev: boolean) => !prev);
  }
  function handleShowTo() {
    setShowTo((prev: boolean) => !prev);
  }

  useEffect(() => {
    async function getData() {
      const data = await getAllConversions(true, true, true);
      const dataArray = data.split(',').slice(0, -1);

      const formatFromTo = dataArray.map((format: string) => {
        const fromTo = format.split('+');
        return { from: fromTo[0], to: fromTo[1], group: fromTo[2] };
      });
      setAllFormats(formatFromTo);
    }
    getData();
  }, []);

  useEffect(() => {
    const filtered = allFormats.filter((format: { from: string }) => {
      return format.from === fromFormatDetect;
    });
    setFormatTo(filtered);
  }, [fromFormatDetect, allFormats]);

  const groups = allFormats.map((item: { group: string }) => {
    if (item.group === 'PDF Document' || item.group === 'PDF Image')
      return 'PDF Tools';
    return item.group;
  });

  const uniqueGroup = [...new Set(groups)];

  return (
    <div className='flex gap-4 items-center'>
      <div className='flex flex-col relative '>
        <div
          onClick={handleShowFrom}
          className='flex justify-center items-center gap-2 cursor-pointer bg-theme-lightGray_2 rounded px-4 py-2'
        >
          <b>{fromFormatDetect.toUpperCase()}</b>
          <HiMiniChevronDown />
        </div>
        {showFrom && (
          <ConversionPickup
            uniqueGroup={uniqueGroup}
            allFormats={allFormats}
            setFromFormatDetect={setFromFormatDetect}
            setShowFrom={setShowFrom}
          />
        )}
      </div>
      <b>to</b>
      <div className='flex flex-col relative '>
        <div
          onClick={handleShowTo}
          className='flex justify-center items-center gap-2 cursor-pointer bg-theme-lightGray_2 rounded px-4 py-2'
        >
          <b>{toFormatDetect.toUpperCase()}</b>
          <HiMiniChevronDown />
        </div>

        {showTo && (
          <div ref={ref}>
            <FormatsContainer width='[24rem]'>
              <ul className='grid grid-cols-3'>
                {formatTo.map((format: { to: string }, i) => {
                  return (
                    <li
                      className='flex justify-center items-center bg-theme-darkGray_2 px-1 py-2 m-2 rounded hover:cursor-pointer text-wrap'
                      key={i}
                      onClick={() => {
                        setToFormatDetect(format.to);
                        setShowFrom(false);
                        setShowTo(false);
                      }}
                    >
                      <Link href={`${fromFormatDetect}-to-${format.to}`}>
                        {format.to.toUpperCase()}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </FormatsContainer>
          </div>
        )}
      </div>
    </div>
  );
}
