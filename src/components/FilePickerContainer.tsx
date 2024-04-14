'use client';

import { FilePickerWrapperContext } from '../context/filePicker.js';
import FilePicker from './FilePicker.jsx';

function FilePickerContainer() {
  return (
    <FilePickerWrapperContext>
      <FilePicker />
    </FilePickerWrapperContext>
  );
}

export default FilePickerContainer;
