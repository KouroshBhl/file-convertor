import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoMdClose } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { HiMiniChevronDown } from 'react-icons/hi2';

import {
  type PickedFilesType,
  useFilePicker,
} from '../../context/FilePickerContext';
import FormatsContainer from './FormatsContainer';
import FormatLists from './FormatLists';
import SearchFormats from './SearchFormats';
import formatByte from '../../utils/helpers/formatByte';
import FileOptions from './FileOptions';

type FileListProps = {
  supportedFormats: any;
  type: string;
  fileDetail: any;
  fileUniqueID: any;
};

export default function FileList({
  supportedFormats,
  type,
  fileDetail,
  fileUniqueID,
}: FileListProps) {
  const { uploadPercentage, setCanUpload, pickedFiles, setPickedFiles } =
    useFilePicker();
  const [filterBySearch, setFilterBySearch] = useState(supportedFormats);
  const [isFormatShowing, setIsFormatShowing] = useState(false);
  const [formatTo, setFormatTo] = useState('...');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const upload = pickedFiles.every((file) => file.formatTo);
    setCanUpload(upload);
  }, [pickedFiles, setCanUpload]);

  if (!fileDetail) return;
  const { name, size, lastModified } = fileDetail.file;

  let findFile = uploadPercentage.find((item: any) => {
    return fileUniqueID === item.fileUniqueID;
  });

  const progressUploadFile = findFile && Math.round(findFile.progress * 100);

  function handleRemoveFile() {
    const deletedFile = pickedFiles.filter((item: any) => {
      return item.fileUniqueID !== fileUniqueID;
    });

    setPickedFiles(deletedFile);
  }

  function handleFormatTo(to: string) {
    setIsFormatShowing(false);
    setFormatTo(to);

    setPickedFiles((file: PickedFilesType[]) =>
      file.map((item: PickedFilesType) =>
        item.fileUniqueID === fileUniqueID ? { ...item, formatTo: to } : item
      )
    );
  }

  return (
    <>
      {showModal && (
        <FileOptions
          formatTo={formatTo}
          type={type}
          setShowModal={setShowModal}
          fileId={lastModified}
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
              <b>{formatTo.toLocaleUpperCase()}</b>
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

        {findFile?.started ? (
          <div className='w-3/4 bg-theme-fontGray rounded-full'>
            <div
              className={`bg-theme-purpleSecondary text-xs font-medium text-theme-white text-center p-0.5 leading-none rounded-full`}
              style={{ width: `${progressUploadFile}%` }}
            >
              {progressUploadFile}%
            </div>
          </div>
        ) : (
          <div
            className={`${
              fileDetail.formatTo ? 'bg-green-500' : 'bg-red-500'
            } w-2/3 flex justify-center items-center rounded py-1'`}
          >
            <span className='text-white text-sm font-semibold'>
              {fileDetail.formatTo ? 'Ready' : 'Choose Output'}
            </span>
          </div>
        )}
        <span className='text-sm font-semibold'>{formatByte(size)}</span>
        <div>
          {fileDetail.formatTo && (
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
