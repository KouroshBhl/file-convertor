import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { ActionDomain } from '../../utils/fileReducer';

import { useFilePicker } from '../../context/FilePickerContext';
import FormatsContainer from './FormatsContainer';
import FormatLists from './FormatLists';
import SearchFormats from './SearchFormats';
import formatByte from '../../utils/helpers/formatByte';
import FileOptions from './FileOptions';

type FileListProps = {
  supportedFormats: any;
  type: string;
  file: File;
  fileUniqueId: string;
  uploadStarted: boolean;
  uploadProgress: number;
  formatTo: string | null;
};

export default function FileList({
  supportedFormats,
  type,
  file,
  fileUniqueId,
  uploadStarted,
  uploadProgress,
  formatTo,
}: FileListProps) {
  const { dispatch } = useFilePicker();
  const [filterBySearch, setFilterBySearch] = useState(supportedFormats);
  const [isFormatShowing, setIsFormatShowing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!file) return;
  const { name, size } = file;

  function handleRemoveFile() {
    dispatch({ type: ActionDomain.HANDLE_REMOVE_FILE, payload: fileUniqueId });
  }

  function handleFormatTo(to: string) {
    dispatch({
      type: ActionDomain.SET_FORMAT_TO,
      payload: { fileUniqueId, to },
    });
    setIsFormatShowing(false);
  }

  return (
    <>
      {showModal && (
        <FileOptions
          formatTo={formatTo}
          type={type}
          setShowModal={setShowModal}
          fileUniqueId={fileUniqueId}
        />
      )}
      <li className='grid grid-cols-[4rem,3fr,1fr,1.5fr,1fr,4rem,4rem] text-base items-center py-2'>
        <Image alt='icon' src={`/icons/${type}.svg`} width={32} height={32} />
        <span>{name}</span>
        <div>
          <div className='flex gap-4 items-center'>
            <b>to</b>
            <div
              className='bg-theme-lightGray_2 px-2 py-1 rounded font-semibold text-sm flex justify-center items-center gap-1 hover:cursor-pointer'
              onClick={() => setIsFormatShowing((prev) => !prev)}
            >
              <b>{formatTo ? formatTo.toLocaleUpperCase() : '...'}</b>
              <HiMiniChevronDown className='text-lg' />
            </div>
          </div>
          {isFormatShowing && (
            <div className='relative'>
              <FormatsContainer className='absolute top-2'>
                <SearchFormats
                  formats={supportedFormats}
                  setter={setFilterBySearch}
                  initState={true}
                />
                <div className='grid grid-cols-3'>
                  {filterBySearch.map((format: string, i: number) => {
                    return (
                      <FormatLists
                        key={i}
                        to={`${type}-to-${format}`}
                        onClick={() => handleFormatTo(format)}
                      >
                        {format.toUpperCase()}
                      </FormatLists>
                    );
                  })}
                </div>
              </FormatsContainer>
            </div>
          )}
        </div>

        {uploadStarted ? (
          <div className='w-3/4 bg-theme-fontGray rounded-full'>
            <div
              className={`bg-theme-purpleSecondary text-xs font-medium text-theme-white text-center p-0.5 leading-none rounded-full`}
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        ) : (
          <div
            className={`${
              formatTo ? 'bg-green-500' : 'bg-red-500'
            } w-2/3 flex justify-center items-center rounded py-1'`}
          >
            <span className='text-white text-sm font-semibold'>
              {formatTo ? 'Ready' : 'Choose Output'}
            </span>
          </div>
        )}
        <span className='text-sm font-semibold'>{formatByte(size)}</span>
        <div>
          {formatTo && (
            <FiSettings
              onClick={() => setShowModal(true)}
              className='text-lg'
            />
          )}
        </div>
        <div
          onClick={handleRemoveFile}
          className='hover:cursor-pointer hover:text-theme-fontRed_4 transition-all delay-100 ease-in-out'
        >
          <IoMdClose className='text-lg' />
        </div>
      </li>
    </>
  );
}
