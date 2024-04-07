import { getConvertorFormats, redirectToSubPage } from '@/utils/actions';
import getFormat from '@/utils/helpers/getFormat';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

type FileListProps = {
  size: number;
  name: string;
  supportedFormats: any;
  type: string;
};

export default function FileList({
  size,
  name,
  supportedFormats,
  type,
}: FileListProps) {
  const router = useRouter();
  function changeUrl() {
    router.push('png-to-pdf');
  }

  return (
    <li className='flex gap-4'>
      <span>ICON</span>
      <p>{name}</p>
      <div>
        <p>To</p>
        <select
          name='convertTo'
          id='convertTo'
          // onChange={(e) => redirectToSubPage(type, e.target.value)}
          onChange={changeUrl}
        >
          <option value='select'>...</option>
          {supportedFormats.map((format, i) => {
            return <option key={i}>{format}</option>;
          })}
        </select>
      </div>
      <p>STATUS</p>
      <p>{size}</p>
      <p>X</p>
    </li>
  );
}
