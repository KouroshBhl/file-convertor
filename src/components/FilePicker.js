'use client';

import path from 'path';
import React, { useRef, useState } from 'react';
import FileList from './FileList';
import { getConvertorFormats } from '@/utils/actions';

export default function FilePicker() {
  const [pickedFiles, setPickedFiles] = useState([]);
  const filePickerRef = useRef(null);

  function handlePickClick() {
    filePickerRef.current.click();
    console.log(pickedFiles);
  }

  async function handlePickedFile(e) {
    const file = e.target?.files[0];

    if (!file) return;

    // const fileType = file.name.split('.')[1];
    const fileType = path.extname(file.name).split('.')[1];

    const supported = await getConvertorFormats(fileType);

    setPickedFiles((prevFiles) => {
      return [
        ...prevFiles,
        { fileDetail: file, supportedFormats: supported, type: fileType },
      ];
    });
    console.log(pickedFiles);
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
            const { fileDetail, supportedFormats, type } = file;
            return (
              <FileList
                key={fileDetail.lastModified}
                name={fileDetail.name}
                size={fileDetail.size}
                supportedFormats={supportedFormats}
                type={type}
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
