'use client';

import { FilePickerWrapperContext } from '../../context/FilePickerContext';
import FilePicker from './FilePicker';

function FilePickerContainer() {
  return (
    <FilePickerWrapperContext>
      <FilePicker />
    </FilePickerWrapperContext>
  );
}

export default FilePickerContainer;
