import React, { useState } from 'react';
import Button from '../ui/Button';
import { useFilePicker } from '@/context/FilePickerContext';
import axios from 'axios';
import { converAPIDomain, convertAPIVersion } from '@/utils/domains';

export default function DownloadAllFiles() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [zipFile, setZipFile] = useState<string>('');
  const { state } = useFilePicker();

  async function handleZipAll() {
    setIsLoading(true);
    const { data } = await axios.post(
      `https://${convertAPIVersion}.${converAPIDomain}/convert/any/to/zip?Secret=QopEu484oe52NgiV`,
      {
        Parameters: [
          {
            Name: 'Files',
            FileValues: state.fileResults.files,
          },
          {
            Name: 'StoreFile',
            Value: true,
          },
        ],
      }
    );
    setZipFile(data.Files[0].Url);
    setIsLoading(false);
  }

  return (
    <div className='flex w-3/5'>
      {!zipFile && (
        <button onClick={handleZipAll} disabled={isLoading}>
          {isLoading ? 'Archiving...' : 'Download All'}
        </button>
      )}
      {zipFile && (
        <a href={zipFile} download>
          Download All
        </a>
      )}
    </div>
  );
}
