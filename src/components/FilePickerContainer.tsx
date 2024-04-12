'use client';

import { FilePickerWrapperContext } from '../context/filePicker.js';
import FilePicker from '../components/FilePicker.js';

function FilePickerContainer() {
  return (
    <FilePickerWrapperContext>
      <FilePicker />
    </FilePickerWrapperContext>
  );
}

export default FilePickerContainer;
