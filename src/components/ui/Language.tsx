'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useTransition } from 'react';
import Select from 'react-select';

import { options } from '../../../public/static/languageData';
import Image from 'next/image';

export default function Language() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  function handleChangeLanguage(e: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  }

  const formatOptionLabel = ({ value, label, flag }: any) => (
    <div>
      <Image
        src={flag}
        alt={label}
        style={{ marginRight: 8 }}
        width={20}
        height={20}
      />
      {label}
    </div>
  );

  return (
    <Select
      // className='basic-single'
      // classNamePrefix='select'
      // name='language'
      options={options}
      instanceId={524044}
      formatOptionLabel={formatOptionLabel}
    />
    // <select
    //   className='hover:cursor-pointer text-base'
    //   onChange={handleChangeLanguage}
    //   defaultValue={localActive}
    // >
    //   {languageData.map((language, index) => {
    //     return (
    //       <option key={index} value={language.value}>
    //         {language.name}
    //         <Image
    //           width={15}
    //           height={10}
    //           alt={`${language.name} language flag`}
    //           src={`/static/languages/${language.value}.svg`}
    //         />
    //       </option>
    //     );
    //   })}
    // </select>
  );
}
