import { useEffect, useState } from 'react';
import Button from './Button';
import ConvertApi from 'convertapi-js';
import axios from 'axios';
import { useFilePicker } from '../context/filePicker.js';

function SubmitFiles() {
  const [resultPromises, setResultPromises] = useState([]);
  const { canUpload, pickedFiles, setUploadPercentage, uploadPercentage } =
    useFilePicker();

  useEffect(() => {
    if (resultPromises.length === 0) return;
    Promise.all(resultPromises).then((result) => console.log(result));
  }, [resultPromises]);

  async function handleSubmitFiles() {
    for (const file of pickedFiles) {
      let findFile = uploadPercentage.find(
        (item) => item.fileId === file.file.lastModified
      );

      console.log(file);

      const data = axios.post(
        `https://v2.convertapi.com/convert/${file.extname}/to/${file.formatTo}?Secret=IqyDEpBdFe1Kucn0`,
        {
          Parameters: [
            {
              Name: 'File',
              FileValue: {
                Name: file.file.name,
                Data: file.base64,
              },
            },
            {
              Name: 'Files',
              FileValue: {
                Name: file.file.name,
                Data: file.base64,
              },
            },
            {
              Name: 'StoreFile',
              Value: true,
            },
          ],
        },
        {
          onUploadProgress: function (progressEvent) {
            setUploadPercentage((prevFiles) => {
              const updatedFiles = prevFiles.map((file) => {
                if (file.fileId === findFile.fileId) {
                  return {
                    ...file,
                    estimated: progressEvent.estimated,
                    loaded: progressEvent.loaded,
                    progress: progressEvent.progress,
                    started: true,
                  };
                }
                return file;
              });
              return updatedFiles;
            });
          },
        }
      );
      setResultPromises((prevPromises) => [...prevPromises, data]);
    }
  }

  return (
    <Button
      isSelector={false}
      disabled={!canUpload}
      onClick={handleSubmitFiles}
      type='button'
    >
      Convert
    </Button>
  );
}

export default SubmitFiles;
