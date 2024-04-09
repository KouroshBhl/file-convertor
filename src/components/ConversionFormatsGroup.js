import { getAllConversions } from '@/utils/actions';
import React, { useEffect, useState } from 'react';
import ConversionPickup from './ConversionPickup';
import FormatsContainer from './FormatsContainer';
import Link from 'next/link';
import { HiMiniChevronDown } from 'react-icons/hi2';
import FormatLists from './FormatLists';

export default function ConversionFormatsGroup() {
  const [allFormats, setAllFormats] = useState([]);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [fromFormatDetect, setFromFormatDetect] = useState('pdf');
  const [toFormatDetect, setToFormatDetect] = useState('...');

  const [formatTo, setFormatTo] = useState([]);

  function handleShowFrom() {
    setShowFrom((prev) => !prev);
    setShowTo(false);
  }
  function handleShowTo() {
    setShowTo((prev) => !prev);
    setShowFrom(false);
  }

  useEffect(() => {
    async function getData() {
      const data = await getAllConversions(true, true, true);
      const dataArray = data.split(',').slice(0, -1);
      const formatFromTo = dataArray.map((format) => {
        const fromTo = format.split('+');
        return { from: fromTo[0], to: fromTo[1], group: fromTo[2] };
      });
      setAllFormats(formatFromTo);
    }
    getData();
  }, []);

  useEffect(() => {
    const filtered = allFormats.filter((format) => {
      return format.from === fromFormatDetect;
    });
    setFormatTo(filtered);
  }, [fromFormatDetect, allFormats]);

  const groups = allFormats.map((item) => {
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
            setShowTo={setShowTo}
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
          <FormatsContainer width='[24rem]'>
            <ul className='grid grid-cols-3'>
              {formatTo.map((format, i) => {
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
        )}
      </div>
    </div>
  );
}
