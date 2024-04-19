'use server';

import { getConvertorFormats } from '@/utils/actions';
import React from 'react';

export default async function SelectConvertTo(type: string) {
  const getFileFormat = type.split('/')[1].toString();
  const fromAllFormated = getConvertorFormats(getFileFormat);

  console.log(fromAllFormated);
  return (
    <select name='convertTo' id='convertTo'>
      <option value='1'>1</option>
      <option value='1'>1</option>
      <option value='1'>1</option>
    </select>
  );
}
