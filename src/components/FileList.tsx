import { getConvertorFormats } from '@/utils/actions';
import getFormat from '@/utils/helpers/getFormat';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import SelectConvertTo from './SelectConvertTo';

type FileListProps = {
  size: number;
  type: string;
  name: string;
};

export default function FileList({ size, type, name }: FileListProps) {
  return (
    <li className='flex gap-4'>
      <span>ICON</span>
      <p>{name}</p>
      <div>
        <p>To</p>
        <SelectConvertTo type={type} />
      </div>
      <p>STATUS</p>
      <p>{size}</p>
      <p>X</p>
      <button>Redirect</button>
    </li>
  );
}
