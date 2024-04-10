import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { HiMiniChevronDown } from 'react-icons/hi2';
import { FiSettings } from 'react-icons/fi';
import FormatsContainer from './FormatsContainer';
import FormatLists from './FormatLists';
import SearchFormats from './SearchFormats';
import formatByte from '../utils/helpers/formatByte';

type FileListProps = {
  size: number;
  name: string;
  supportedFormats: any;
  type: string;
  fileDetail: any;
  setPickedFiles: (array) => void;
  pickedFiles: any;
  setCanUpload: any;
};

export default function FileList({
  supportedFormats,
  type,
  setPickedFiles,
  fileDetail,
  pickedFiles,
  setCanUpload,
}: FileListProps) {
  const [filterBySearch, setFilterBySearch] = useState(supportedFormats);
  const [isFormatShowing, setIsFormatShowing] = useState(false);
  const [formatTo, setFormatTo] = useState('...');

  if (!fileDetail) return;
  const { name, size, lastModified } = fileDetail.file;

  function handleRemoveFile() {
    const deletedFile = pickedFiles.filter((item) => {
      return item.file.lastModified !== lastModified;
    });

    setPickedFiles(deletedFile);
  }

  function handleFormatTo(to) {
    setIsFormatShowing(false);
    setFormatTo(to);
    const findFile = pickedFiles.find((item) => {
      return item.file.lastModified === lastModified;
    });
    findFile.formatTo = to;

    const upload = pickedFiles.every((file) => file.formatTo);
    setCanUpload(upload);
  }

  return (
    <>
      <li className='grid grid-cols-[4rem,3fr,1fr,1fr,1fr,4rem,4rem] text-base items-center py-2'>
        <span>ICON</span>
        <p>{name}</p>
        <div>
          <div className='flex gap-4 items-center'>
            <span>to</span>
            <div
              className='bg-theme-lightGray_2 px-2 py-1 rounded font-semibold text-sm flex justify-center items-center gap-1 hover:cursor-pointer'
              onClick={() => setIsFormatShowing((prev) => !prev)}
            >
              <span>{formatTo}</span>
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
                        {format}
                      </FormatLists>
                    );
                  })}
                </div>
              </FormatsContainer>
            </div>
          )}
        </div>
        <p>STATUS</p>
        <span>{formatByte(size)}</span>
        <div>{fileDetail.formatTo && <FiSettings />}</div>
        <div
          onClick={handleRemoveFile}
          className='hover:cursor-pointer hover:text-theme-fontRed_4 transition-all delay-100 ease-in-out'
        >
          <IoMdClose />
        </div>
      </li>
    </>
  );
}
