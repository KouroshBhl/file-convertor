import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import React, { ChangeEvent, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ActionDomain } from '@/utils/fileReducer';
import { toBase64 } from '../../utils/helpers/toBase64';

import { useFilePicker } from '../../context/FilePickerContext';
import { getConvertorFormats } from '@/utils/actions';
import ConversionFormatsGroup from './ConversionFormatsGroup';
import FileList from './FileList';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import SubmitFiles from './SubmitFiles';
import DownloadAllFiles from './DownloadAllFiles';

export default function FilePicker() {
  const filePickerRef = useRef<HTMLInputElement>(null);

  const { state, dispatch } = useFilePicker();

  function handlePickClick() {
    dispatch({ type: ActionDomain.SET_ERROR, payload: false });
    if (filePickerRef.current) filePickerRef.current.click();
  }

  async function handlePickedFile(e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: ActionDomain.SET_ERROR, payload: false });

    try {
      const file = e.target?.files;

      if (!file) return;
      dispatch({ type: ActionDomain.SET_LOADING, payload: true });

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

        return {
          file,
          extname,
          supported,
          formatTo: null,
          base64: base64.split(',')[1],
          parameters: [],
          results: {
            isResults: false,
            FileExt: '',
            FileId: '',
            FileName: '',
            FileSize: 0,
            Url: '',
          },
          fileUniqueId: uuidv4(),
          isError: false,
          isLoading: false,
          showFrom: false,
          showTo: false,
          uploadStarted: false,
          uploadProgress: 0,
          uploadEstimated: 0,
        };
      });

      Promise.all(fileTypes).then((values) => {
        const deleteNull = values.filter((value) => value);

        if (deleteNull.length !== 0)
          dispatch({ type: ActionDomain.SELECT_FILES, payload: deleteNull });
      });

      dispatch({ type: ActionDomain.SET_LOADING, payload: false });
      // setCanUpload(false);
    } catch (error: any) {
      toast.error(`Sorry, ${error.message} format is not supported yet!`, {
        position: 'top-center',
        style: {
          fontSize: '1rem',
        },
      });
      dispatch({ type: ActionDomain.SET_ERROR, payload: true });
      dispatch({ type: ActionDomain.SET_LOADING, payload: false });
    }
  }

  return (
    <div className='h-1/4 bg-theme-lightGray w-full flex gap-12 flex-col justify-center items-center lg:py-44 md:py-40 py-28'>
      <Toaster />

      {state.pickedFiles.length === 0 && (
        <div className='lg:w-3/5 md:w-4/5 w-full h-72 bg-theme-white rounded-2xl border-dashed border-2 border-theme-purplePrimary lg:p-32 flex items-center'>
          <div className='flex items-center justify-between flex-col lg:flex-row w-full gap-10'>
            <Button isSelector={false} onClick={handlePickClick}>
              Choose Files
            </Button>

            {state.isLoading ? <Loader /> : <ConversionFormatsGroup />}
          </div>
        </div>
      )}

      {state.pickedFiles.length !== 0 && (
        <ul className='flex flex-col gap-4 bg-theme-white lg:w-4/5 2xl:w-3/5 p-6 rouded w-full'>
          {state.pickedFiles.map((item, i) => {
            const {
              supported: supportedFormats,
              extname: type,
              fileUniqueId,
              uploadStarted,
              uploadProgress,
              formatTo,
              results,
            } = item;

            return (
              <FileList
                key={i}
                supportedFormats={supportedFormats}
                type={type}
                file={item.file}
                fileUniqueId={fileUniqueId}
                uploadStarted={uploadStarted}
                uploadProgress={uploadProgress}
                formatTo={formatTo}
                results={results}
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

      {state.pickedFiles.length > 0 && !state.fileResults.isCompleted && (
        <div className='flex justify-between items-center w-3/5'>
          <Button isSelector={true} onClick={handlePickClick}>
            Add More Files
          </Button>

          <SubmitFiles />
        </div>
      )}

      {state.fileResults.isCompleted && <DownloadAllFiles />}
    </div>
  );
}
