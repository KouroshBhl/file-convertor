'use server';

import { redirect } from 'next/navigation';
import {
  formatAllConversions,
  formatSomeConversions,
  getSupportedFormats,
} from './helpers/convertAPIFormat';
import { converAPIDomain, convertAPIVersion } from './domains';
import ConvertApi from 'convertapi-js';

type ConvertProps = {
  file: any;
};

type GetConvertorFormatsProps = {
  convertFrom: string;
};

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
  } catch (error) {
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

export async function convert(formData) {
  console.log(formData);
  // const { base64, name } = file;
  // console.log(formData.get());
  // console.log('=================================');
  // let convertApi = ConvertApi.auth(process.env.NEXT_PUBLIC_CONVERTAPI_SECRET);
  // let params = convertApi.createParams();
  // params.add('file', file.file);
  // let result = await convertApi.convert(file.extname, file.formatTo, params);
  // console.log(result.files[0].Url);
  // return result.files[0].Url;

  // const response = await fetch(
  //   `https://${convertAPIVersion}.${converAPIDomain}/convert/${file.extname}/to/${file.formatTo}?Secret=${process.env.NEXT_PUBLIC_CONVERTAPI_SECRET}`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       Parameters: [
  //         {
  //           Name: 'File',
  //           FileValue: {
  //             Name: name,
  //             Data: base64,
  //           },
  //         },
  //         {
  //           Name: 'StoreFile',
  //           Value: true,
  //         },
  //       ],
  //     }),
  //   }
  // );
  // const data = await response.json();
  // console.log(data);
  // return data;
}

export async function converToFormat(file) {
  console.log('=================================');
}
