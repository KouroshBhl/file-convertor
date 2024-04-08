import { useState } from 'react';
import FormatsContainer from './FormatsContainer';

function ConversionPickup({ uniqueGroup, allFormats, setFromFormatDetect }) {
  const [groupDetect, setGroupDetect] = useState('');

  function handleDetectGroupFormat(e) {
    setGroupDetect(e.target.getAttribute('data-value'));
  }

  function handleDetectFormat(e) {
    setFromFormatDetect(e.target.getAttribute('data-value'));
  }

  const filterByGroup = allFormats.filter((format) => {
    return format.group === groupDetect;
  });

  const uniqueSet = Array.from(new Set(filterByGroup.map((a) => a.from))).map(
    (from) => {
      return filterByGroup.find((a) => a.from === from);
    }
  );

  console.log(uniqueSet);

  return (
    <FormatsContainer>
      <div>Search</div>
      <div className='grid grid-cols-2 gap-6'>
        <ul className='flex flex-col gap-2'>
          {uniqueGroup.map((group, i) => {
            return (
              <li
                key={i}
                data-value={group}
                className='border-b-[1px] border-theme-fontGray hover:cursor-pointer'
                onMouseOver={handleDetectGroupFormat}
              >
                {group}
              </li>
            );
          })}
        </ul>

        <div>
          <ul className='grid grid-cols-3'>
            {uniqueSet.map((format, id) => {
              return (
                <li
                  className='bg-theme-fontGray px-1 m-2 rounded hover:cursor-pointer'
                  key={id}
                  onClick={handleDetectFormat}
                  data-value={format.from}
                >
                  {format.from}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FormatsContainer>
  );
}

export default ConversionPickup;
