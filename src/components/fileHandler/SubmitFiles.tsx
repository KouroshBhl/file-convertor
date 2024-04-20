import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import axios, { AxiosResponse } from 'axios';
import { useFilePicker } from '../../context/FilePickerContext';
import { convertAPIVersion, converAPIDomain } from '../../utils/domains';
import { ActionDomain } from '@/utils/fileReducer';

function SubmitFiles() {
  const [resultPromises, setResultPromises] = useState<
    Promise<AxiosResponse<any, any>>[]
  >([]);
  const { state, dispatch } = useFilePicker();

  useEffect(() => {
    if (resultPromises.length === 0) return;
    Promise.all(resultPromises).then((result) => console.log(result));
  }, [resultPromises]);

  async function handleSubmitFiles() {
    for (const file of state.pickedFiles) {
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
            dispatch({
              type: ActionDomain.SET_FILE_UPLOAD_STATUS,
              payload: { progressEvent, fileUniqueID: file.fileUniqueId },
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
      disabled={!state.pickedFiles.every((file) => file.formatTo)}
      onClick={handleSubmitFiles}
      type='button'
    >
      Convert
    </Button>
  );
}

export default SubmitFiles;
