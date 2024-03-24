import { formatAllConversions } from '@/utils/helpers/convertAPIFormat';

import { convertAPIVersion, converAPIDomain } from '@/utils/domains';

export default function Page() {
  // console.log(conversion);
  return <div>ok</div>;
}

// export async function getStaticPaths() {
//   const response = await fetch(
//     `https://${convertAPIVersion}.${converAPIDomain}/info`
//   );
//   const data = await response.json();

//   const conversionFormat = data.map((item: any, i: any) => {
//     return { from: item.SourceFileFormats, to: item.DestinationFileFormats };
//   });

//   const formatedAllConversions = conversionFormat.reduce(
//     (acc: any, item: any) => {
//       return acc + formatAllConversions(item);
//     },
//     []
//   );

//   const formatedAllConversionsArray = formatedAllConversions.split(',');
//   const paths = formatedAllConversionsArray.map((conversion: string) => ({
//     params: { id: conversion },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStatisProps({ params }: any) {
//   console.log(params);

//   const res = await fetch(
//     `https://${convertAPIVersion}.${converAPIDomain}/${params.id.replaceAll(
//       '-',
//       '/'
//     )}`
//   );
//   const conversion = await res.json();

//   return { props: { conversion } };
// }
