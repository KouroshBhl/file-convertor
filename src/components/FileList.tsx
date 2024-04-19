import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { FiSettings } from 'react-icons/fi';
import FormatsContainer from './FormatsContainer';
import FormatLists from './FormatLists';
import SearchFormats from './SearchFormats';
import formatByte from '../utils/helpers/formatByte';
import { useFilePicker } from '../context/filePicker.js';
import FileOptions from './FileOptions';
import Image from 'next/image';

type FileListProps = {
  size: number;
  name: string;
  supportedFormats: any;
  type: string;
  fileDetail: any;
  setPickedFiles: (array) => void;
  pickedFiles: any;
  setCanUpload: any;
  uploadPercentage: any;
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

  if (!fileDetail) return;
  const { name, size, lastModified } = fileDetail.file;

  let findFile = uploadPercentage.find((item) => {
    return fileUniqueID === item.fileUniqueID;
  });

  const progressUploadFile = Math.round(findFile?.progress * 100);

  function handleRemoveFile() {
    const deletedFile = pickedFiles.filter((item) => {
      console.log(item.fileUniqueID, fileUniqueID);
      return item.fileUniqueID !== fileUniqueID;
    });

    setPickedFiles(deletedFile);
  }

  function handleFormatTo(to) {
    setIsFormatShowing(false);
    setFormatTo(to);

    setPickedFiles((file) =>
      file.map((item) =>
        item.fileUniqueID === fileUniqueID ? { ...item, formatTo: to } : item
      )
    );
  }
  const upload = pickedFiles.every((file) => file.formatTo);
  setCanUpload(upload);

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
                  {filterBySearch.map((format, i) => {
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

        {findFile.started ? (
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
