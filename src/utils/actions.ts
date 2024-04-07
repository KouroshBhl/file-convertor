'use server';

import { getSupportedFormats } from './helpers/convertAPIFormat';

type ConvertProps = {
  requestUrl: string;
};

type GetConvertorFormatsProps = {
  convertFrom: string;
};

export async function convert({ requestUrl }: ConvertProps) {
  console.log('Sent');
}

export async function getConvertorFormats(convertFrom: any) {
  console.log(convertFrom);
  const response = await fetch(
    `https://v2.convertapi.com/info/${convertFrom}/to/*`
  );

  const data = await response.json();

  const formated = getSupportedFormats(data, false, true);
  return formated;
}
