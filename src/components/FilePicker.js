'use client';

import React, { useRef, useState } from 'react';
import Button from './Button';
import FileList from './FileList';
import { getConvertorFormats } from '@/utils/actions';
import getFormat from '../utils/helpers/getFormat';

export default function FilePicker() {
  const [pickedFiles, setPickedFiles] = useState([]);
  const filePickerRef = useRef(null);

  function handlePickClick() {
    filePickerRef.current.click();
    console.log(pickedFiles);
  }

  function handlePickedFile(e) {
    const file = e.target?.files[0];
    console.log(file);

    if (!file) return;

    const fileType = getFormat(file);

    setPickedFiles((prevFiles) => {
      return [...prevFiles, file];
    });

    // const fileReader: any = new FileReader();

    // fileReader.onload = () => {
    //   setPickedImg(fileReader.result);
    // };

    // fileReader.readAsDataURL(file);
    // console.log(pickedImg);
  }

  return (
    <div className='w-8/12 h-72 bg-theme-white py-8 rounded-2xl border-dashed border-2 border-theme-purplePrimary p-8 flex justify-center items-center'>
      {pickedFiles.length === 0 && (
        <h3 className='text-theme-fontGray text-xl font-semibold'>
          Drag your files here
        </h3>
      )}

      {pickedFiles.length !== 0 && (
        <ul className='flex flex-col gap-4'>
          {pickedFiles.map((file) => {
            return (
              <FileList
                key={file.lastModified}
                name={file.name}
                size={file.size}
                type={file.type}
              />
            );
          })}
        </ul>
      )}

      <input
        type='file'
        id='file'
        accept='*'
        name='filePicker'
        className='hidden'
        ref={filePickerRef}
        required
        onChange={handlePickedFile}
      />
      <button onClick={handlePickClick} type='button'>
        c
      </button>
    </div>
  );
}
