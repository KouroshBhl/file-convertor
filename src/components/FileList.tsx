import { getConvertorFormats } from '@/utils/actions';
import getFormat from '@/utils/helpers/getFormat';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';

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
  function changeUrl(from: string, to: string) {
    router.push(`${from}-to-${to}`);
  }

  return (
    <li className='flex gap-4'>
      <span>ICON</span>
      <p>{name}</p>
      <div>
        <p>To</p>
        <div
          // name='convertTo'
          id='convertTo'
          // onChange={(e) => changeUrl(type, e.target.value)}
        >
          {/* <option value='select'>...</option> */}
          {supportedFormats.map((format, i) => {
            return (
              <Link key={i} href={`${type}-to-${format}`}>
                {format}
              </Link>
            );
          })}
        </div>
      </div>
      <p>STATUS</p>
      <p>{size}</p>
      <p>X</p>
    </li>
  );
}
