'use client';

import path from 'path';
import React, { useRef, useState } from 'react';
import ConversionFormatsGroup from './ConversionFormatsGroup.js';
import FileList from './FileList';
import { getConvertorFormats } from '@/utils/actions';
import Button from './Button';

export default function FilePicker() {
  const [pickedFiles, setPickedFiles] = useState([]);
  const filePickerRef = useRef(null);

  function handlePickClick() {
    filePickerRef.current.click();
  }

  async function handlePickedFile(e) {
    const file = e.target?.files[0];

    if (!file) return;

    const fileType = path.extname(file.name).split('.')[1];

    const supported = await getConvertorFormats(fileType);

    setPickedFiles((prevFiles) => {
      return [
        ...prevFiles,
        { fileDetail: file, supportedFormats: supported, type: fileType },
      ];
    });
  }

  return (
    <>
      {pickedFiles.length === 0 && (
        <div className='w-3/5 h-72 bg-theme-white py-8 rounded-2xl border-dashed border-2 border-theme-purplePrimary p-32 flex items-center'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Button isSelector={true} onClick={handlePickClick}>
                Choose Files
              </Button>
              {/* <h3 className='text-theme-fontGray text-xl font-semibold'>
                Drag your files here
              </h3> */}
            </div>

            <ConversionFormatsGroup />
          </div>
        </div>
      )}
      {pickedFiles.length !== 0 && (
        <ul className='flex flex-col gap-4 bg-theme-white w-3/5'>
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

      {pickedFiles.length > 0 && (
        <Button isSelector={true} onClick={handlePickClick}>
          Add More Files
        </Button>
      )}
    </>
  );
}
