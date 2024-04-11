import { useEffect, useState } from 'react';
import Button from './Button';
import ConvertApi from 'convertapi-js';
import axios from 'axios';

// uploading, converting, finished

const convertApi = ConvertApi.auth('IqyDEpBdFe1Kucn0');

function SubmitFiles({
  canUpload,
  pickedFiles,
  setPickedFiles,
  setUploadPercentage,
  uploadPercentage,
}) {
  const [resultPromises, setResultPromises] = useState([]);

  useEffect(() => {
    if (resultPromises.length === 0) return;
    Promise.all(resultPromises).then((result) => console.log(result));
  }, [resultPromises]);

  async function handleSubmitFiles() {
    for (const file of pickedFiles) {
      let findFile = uploadPercentage.find(
        (item) => item.fileId === file.file.lastModified
      );

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
              Name: 'StoreFile',
              Value: true,
            },
          ],
        },
        {
          onUploadProgress: function (progressEvent) {
            console.log(progressEvent);

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
  //   const { extname, formatTo, file } = pickedFiles[0];
  //   const base64 = await toBase64(file);
  //   console.log(extname, formatTo);
  //   if (!base64) return;

  //   const data = await axios.post(
  //     `https://v2.convertapi.com/convert/${extname}/to/${formatTo}?Secret=IqyDEpBdFe1Kucn0`,
  //     {
  //       Parameters: [
  //         {
  //           Name: 'File',
  //           FileValue: {
  //             Name: file.name,
  //             Data: base64.split(',')[1],
  //           },
  //         },
  //         {
  //           Name: 'StoreFile',
  //           Value: true,
  //         },
  //       ],
  //     },
  //     {
  //       onUploadProgress: function (progressEvent) {
  //         console.log(progressEvent);
  //       },
  //     }
  //   );

  //   console.log(data);
  // }

  // const [resultPromises, setResultPromises] = useState([]);

  // useEffect(() => {
  //   console.log(convertApi);
  //   Promise.all(resultPromises).then((result) => console.log(result));
  // }, [resultPromises]);

  // async function handleSubmitFiles() {
  //   for (const file of pickedFiles) {
  //     let params = convertApi.createParams();
  //     params.add('file', file.file);
  //     let results = convertApi.convert(file.extname, file.formatTo, params);

  //     setResultPromises((prevPromises) => [...prevPromises, results]);
  //     console.log(params);
  //   }
  // }

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
