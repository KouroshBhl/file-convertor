import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import axios, { AxiosResponse } from 'axios';
import { useFilePicker } from '../../context/FilePickerContext';
import { convertAPIVersion, converAPIDomain } from '../../utils/domains';

function SubmitFiles() {
  const [resultPromises, setResultPromises] = useState<
    Promise<AxiosResponse<any, any>>[]
  >([]);
  const { canUpload, pickedFiles, setUploadPercentage, uploadPercentage } =
    useFilePicker();

  useEffect(() => {
    if (resultPromises.length === 0) return;
    Promise.all(resultPromises).then((result) => console.log(result));
  }, [resultPromises]);

  async function handleSubmitFiles() {
    for (const file of pickedFiles) {
      let findFile = uploadPercentage.find(
        (item) => item.fileUniqueID === file.fileUniqueID
      );

      const data = axios.post(
        `https://${convertAPIVersion}.${converAPIDomain}/convert/${file.extname}/to/${file.formatTo}?Secret=IqyDEpBdFe1Kucn0`,
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

            ...file.parameters,
          ],
        },

        {
          onUploadProgress: function (progressEvent) {
            setUploadPercentage((prevFiles: any) => {
              const updatedFiles = prevFiles.map(
                (file: { fileUniqueID: number }) => {
                  if (file.fileUniqueID === findFile?.fileUniqueID) {
                    return {
                      ...file,
                      estimated: progressEvent.estimated,
                      loaded: progressEvent.loaded,
                      progress: progressEvent.progress,
                      started: true,
                    };
                  }
                  return file;
                }
              );
              return updatedFiles;
            });
          },
        }
      );
      setResultPromises((prevPromises: any) => [...prevPromises, data]);
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
