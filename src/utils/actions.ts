'use server';

import {
  formatAllConversions,
  formatSomeConversions,
  getSupportedFormats,
} from './helpers/convertAPIFormat';
import { converAPIDomain, convertAPIVersion } from './domains';

export async function getConvertorFormats(convertFrom: any) {
  try {
    const response = await fetch(
      `https://v2.convertapi.com/info/${convertFrom}/to/*`
    );

    if (response.status !== 200)
      throw new Error('Sorry, format is not supported yet!');

    const data = await response.json();

    const formated = getSupportedFormats(data, false, true, false);

    const formatToConversion = formatSomeConversions(formated);

    return formatToConversion;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getAllConversions(
  from: boolean,
  to: boolean,
  group: boolean = false
) {
  console.log('getAllConversions');
  try {
    const response = await fetch(
      `https://${convertAPIVersion}.${converAPIDomain}/info`
    );
    const data = await response.json();

    const supportedFormats = getSupportedFormats(data, from, to, group);

    const formatedData = supportedFormats.reduce((acc: any, item: any) => {
      return acc + formatAllConversions(item, group);
    }, []);

    return formatedData;
  } catch (error) {
    console.log('OPS');
  }
}

export async function convert(formData) {}

export async function converToFormat(file) {
  console.log('=================================');
}
