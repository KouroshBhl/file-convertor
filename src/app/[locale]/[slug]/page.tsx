import {
  formatAllConversions,
  getSupportedFormats,
} from '@/utils/helpers/convertAPIFormat';
import FilePicker from '@/components/FilePicker.jsx';

import { convertAPIVersion, converAPIDomain } from '@/utils/domains';
import { locales } from '@/i18n';
import Form from '@/components/Form';
import Button from '@/components/Button';
import { convert, getAllConversions } from '@/utils/actions';
import Heading from '@/components/Heading';

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
  const formatParamSlug = params.slug.split('-to-');
  return (
    <div>
      <Heading>
        {formatParamSlug[0].toUpperCase()} to {formatParamSlug[1].toUpperCase()}
      </Heading>
      {/* <Form action={convert}>
        <FilePicker />
        <Button isSelector={true} name='Add File' />
      </Form> */}
    </div>
  );
}

export async function getStaticPaths() {
  const formatedAllConversionsArray = await getAllConversions(true, true);

  const formatedArray = formatedAllConversionsArray.split(',').slice(0, -1);

  // const paths = formatedAllConversionsArray.map((conversion: string) => ({
  //   params: { slug: conversion, locale: 'id' },
  // }));

  const paths = [];
  for (const locale of locales) {
    for (const conversion of formatedArray) {
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
