import path from 'path';
import React, { ChangeEvent, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import ConversionFormatsGroup from './ConversionFormatsGroup';
import FileList from './FileList';
import { getConvertorFormats } from '@/utils/actions';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import SubmitFiles from './SubmitFiles';
import { toBase64 } from '../../utils/helpers/toBase64';
import { useFilePicker } from '../../context/FilePickerContext';

export default function FilePicker() {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const {
    setIsError,
    setIsLoading,
    setUploadPercentage,
    setCanUpload,
    pickedFiles,
    isLoading,
    setPickedFiles,
  } = useFilePicker();

  function handlePickClick() {
    setIsError(false);
    if (filePickerRef.current) filePickerRef.current.click();
  }

  async function handlePickedFile(e: ChangeEvent<HTMLInputElement>) {
    setIsError(false);

    try {
      const file = e.target?.files;

      if (!file) return;
      setIsLoading(true);

      const ArrayFiles = Array.from(file);

      const fileTypes = ArrayFiles.map(async (file: any) => {
        const extname = path
          .extname(file.name)
          .split('.')[1]
          .toLocaleLowerCase();
        const supported = await getConvertorFormats(extname);
        const base64: any = await toBase64(file);
        if (!supported) {
          toast.error(`Sorry ${extname} format is not supported yet!`, {
            position: 'top-center',
            style: {
              fontSize: '1rem',
            },
          });
          return;
        }
        setUploadPercentage((prevFiles: any) => {
          return [
            ...prevFiles,
            {
              fileUniqueID: `${file.lastModified}${file.size}`,
              estimated: 0,
              loaded: 0,
              progress: 0,
              started: false,
            },
          ];
        });

        return {
          file,
          extname,
          supported,
          formatTo: null,
          base64: base64.split(',')[1],
          parameters: [],
          results: {},
          fileUniqueID: `${file.lastModified}${file.size}`,
        };
      });

      Promise.all(fileTypes).then((values) => {
        const deleteNull = values.filter((value) => value);

        if (deleteNull.length !== 0)
          setPickedFiles((prevFiles: any) => [...prevFiles, ...deleteNull]);
      });

      setIsLoading(false);
      setCanUpload(false);
    } catch (error: any) {
      toast.error(`Sorry, ${error.message} format is not supported yet!`, {
        position: 'top-center',
        style: {
          fontSize: '1rem',
        },
      });
      setIsError(true);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      {pickedFiles.length === 0 && (
        <div className='w-3/5 h-72 bg-theme-white py-8 rounded-2xl border-dashed border-2 border-theme-purplePrimary p-32 flex items-center'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Button
                isSelector={true}
                onClick={handlePickClick}
                disabled={isLoading}
              >
                Choose Files
              </Button>
              {/* <h3 className='text-theme-fontGray text-xl font-semibold'>
                Drag your files here
              </h3> */}
            </div>

            {isLoading ? <Loader /> : <ConversionFormatsGroup />}
          </div>
        </div>
      )}

      {pickedFiles.length !== 0 && (
        <ul className='flex flex-col gap-4 bg-theme-white w-3/5 p-6 rouded'>
          {pickedFiles.map((item, i) => {
            const {
              supported: supportedFormats,
              extname: type,
              fileUniqueID,
            } = item;

            return (
              <FileList
                key={i}
                supportedFormats={supportedFormats}
                type={type}
                fileDetail={item}
                fileUniqueID={fileUniqueID}
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
        multiple
        onChange={handlePickedFile}
      />

      {pickedFiles.length > 0 && (
        <div className='flex justify-between items-center w-3/5'>
          <Button isSelector={true} onClick={handlePickClick}>
            Add More Files
          </Button>

          <SubmitFiles />
        </div>
      )}
    </>
  );
}
