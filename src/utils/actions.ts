'use server';

import { redirect } from 'next/navigation';
import {
  formatSomeConversions,
  getSupportedFormats,
} from './helpers/convertAPIFormat';

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
  const response = await fetch(
    `https://v2.convertapi.com/info/${convertFrom}/to/*`
  );

  const data = await response.json();

  const formated = getSupportedFormats(data, false, true);

  const formatToConversion = formatSomeConversions(formated);

  return formatToConversion;
}

export async function redirectToSubPage(from: string, to: string) {
  redirect(`${from}-to-${to}`);
}
