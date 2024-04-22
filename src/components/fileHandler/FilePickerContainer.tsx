'use client';

import { usePathname } from 'next/navigation';
import { FilePickerWrapperContext } from '../../context/FilePickerContext';
import FilePicker from './FilePicker';

function FilePickerContainer() {
  const pathName = usePathname();
  if (pathName.includes('about')) return;

  return (
    <FilePickerWrapperContext>
      <FilePicker />
    </FilePickerWrapperContext>
  );
}

export default FilePickerContainer;
