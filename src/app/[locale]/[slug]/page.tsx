import {
  formatAllConversions,
  getSupportedFormats,
} from '@/utils/helpers/convertAPIFormat';
import FilePicker from '@/components/FilePicker.js';

import { convertAPIVersion, converAPIDomain } from '@/utils/domains';
import { locales } from '@/i18n';
import Form from '@/components/Form';
import Button from '@/components/Button';
import { convert } from '@/utils/actions';

type ParamsProps = {
  params: {
    slug: string;
    locale: string;
  };
};

type GetStatisProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: ParamsProps) {
  return (
    <div>
      <h1>{params.slug}</h1>
      {/* <Form action={convert}>
        <FilePicker />
        <Button isSelector={true} name='Add File' />
      </Form> */}
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://${convertAPIVersion}.${converAPIDomain}/info`
  );
  const data = await response.json();

  const supportedFormats = getSupportedFormats(data, true, true);

  const formatedAllConversions = supportedFormats.reduce(
    (acc: any, item: any) => {
      return acc + formatAllConversions(item);
    },
    []
  );

  const formatedAllConversionsArray = formatedAllConversions
    .split(',')
    .slice(0, -1);
  // const paths = formatedAllConversionsArray.map((conversion: string) => ({
  //   params: { slug: conversion, locale: 'id' },
  // }));

  const paths = [];
  for (const locale of locales) {
    for (const conversion of formatedAllConversionsArray) {
      paths.push({ params: { slug: conversion, locale: locale } });
    }
  }

  return { paths, fallback: false };
}

export async function getStatisProps({ params }: GetStatisProps) {
  const res = await fetch(
    `https://${convertAPIVersion}.${converAPIDomain}/${params.slug.replaceAll(
      '-',
      '/'
    )}`
  );
  const conversion = await res.json();

  return { props: { conversion } };
}
