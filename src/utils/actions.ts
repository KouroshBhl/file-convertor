'use server';

import { redirect } from 'next/navigation';
import {
  formatAllConversions,
  formatSomeConversions,
  getSupportedFormats,
} from './helpers/convertAPIFormat';
import { converAPIDomain, convertAPIVersion } from './domains';

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

  const formated = getSupportedFormats(data, false, true, false);

  const formatToConversion = formatSomeConversions(formated);

  return formatToConversion;
}

export async function getAllConversions(
  from: boolean,
  to: boolean,
  group: boolean = false
) {
  const response = await fetch(
    `https://${convertAPIVersion}.${converAPIDomain}/info`
  );
  const data = await response.json();

  const supportedFormats = getSupportedFormats(data, from, to, group);

  const formatedData = supportedFormats.reduce((acc: any, item: any) => {
    return acc + formatAllConversions(item, group);
  }, []);

  return formatedData;
}
