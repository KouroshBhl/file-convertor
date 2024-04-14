import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDetectOutside } from '../utils/hooks/useDetectMouseOutside';
import { convertAPIVersion, converAPIDomain } from '../utils/domains.ts';
import { useForm } from 'react-hook-form';
import { FaInfo } from 'react-icons/fa';
import Button from './Button.tsx';
import { useFilePicker } from '../context/filePicker.js';

function FileOptions({ formatTo, type, setShowModal, fileId }) {
  const ref = useDetectOutside(setShowModal);
  const [fileOptions, setFileOptions] = useState([]);
  const [showDescription, setShowDescription] = useState('');
  const [formattedParameters, setFormattedParameters] = useState([]);
  const { setPickedFiles, pickedFiles } = useFilePicker();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    const file = pickedFiles.find((file) => file.file.lastModified === fileId);

    const params = [];
    for (let parameter in data) {
      if (
        data[parameter] !== '' &&
        data[parameter] !== null &&
        data[parameter] !== undefined &&
        data[parameter] !== 'default'
      ) {
        params.push({ Name: parameter, Value: data[parameter] });
      }
    }

    setPickedFiles((prev) => {
      const updatedParameters = prev.map((file) => {
        if (file.file.lastModified === fileId) {
          return { ...file, parameters: params };
        }
        return file;
      });
      return updatedParameters;
    });

    // const validParameters = data.filter((parameter) => {
    //   console.log(parameter);
    //   if (parameters) return parameter;
    // });
    // console.log(validParameters);

    // const updatedFile = {
    //   ...file,
    //   parameters: formatedParameters,
    // };
    // const updatedFiles = pickedFiles.map((file) => {
    //   if (file.file.lastModified === fileId) {
    //     return formatedParameters;
    //   }
    //   return file;
    // });
    // console.log(updatedFiles);
    // setPickedFiles(updatedFiles);

    setShowModal(false);
  }

  const handleShowDescription = (optionName) => {
    setShowDescription(optionName);
  };

  useEffect(() => {
    async function getConversionOptions() {
      const data = await axios.get(
        `https://${convertAPIVersion}.${converAPIDomain}/info/${type}/to/${formatTo}`
      );

      const getOptions = data.data
        .at(0)
        .ConverterParameterGroups.slice(
          4,
          data.data.at(0).ConverterParameterGroups.length
        );

      let parameters = [];
      if (getOptions.length > 1) {
        parameters = getOptions[0].ConverterParameters.concat(
          getOptions[1].ConverterParameters
        );
      }
      if (getOptions.length === 1) {
        parameters = getOptions[0].ConverterParameters;
      }

      console.log(parameters);
      setFileOptions(parameters);
    }
    getConversionOptions();
  }, [formatTo, type]);

  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-theme-darkGray_1 z-30 transition-all delay-150 '>
      <div
        className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-theme-lightGray_1 p-12 rounded'
        ref={ref}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='grid grid-cols-2 gap-8 text-sm'
        >
          {fileOptions.map((option, id) => {
            return (
              <div key={id} className='grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <label htmlFor={option.Name}>{option.Label}</label>
                  <div
                    className='text-xs relative'
                    onMouseEnter={() =>
                      handleShowDescription(option.Description)
                    }
                    onMouseLeave={() => setShowDescription('')}
                  >
                    <FaInfo className='hover:cursor-pointer' />
                    {showDescription &&
                      showDescription === option.Description && (
                        <div className='bg-theme-darkGray_1 text-theme-white  absolute top-0  w-52 p-3 rounded '>
                          <p className='text-sm'>{showDescription}</p>
                        </div>
                      )}
                  </div>
                </div>
                {option.Type === 'Bool' && (
                  <div className='flex gap-6'>
                    <div className='flex gap-2'>
                      <input
                        {...register(option.Name)}
                        type='radio'
                        value={true}
                      />
                      <label htmlFor={option.Name}>Yes</label>
                    </div>
                    <div className='flex gap-2'>
                      <input
                        {...register(option.Name)}
                        type='radio'
                        value={false}
                      />
                      <label htmlFor={option.Name}>No</label>
                    </div>
                  </div>
                )}
                {option.Type === 'Integer' && (
                  <input
                    className='px-2 py-1 rounded'
                    placeholder={`from: ${option?.Range?.From}, to: ${option?.Range?.To}`}
                    {...register(option.Name, {
                      min: {
                        value: option?.Range?.From,
                        message: 'Capacity should be at least 1',
                      },
                      max: {
                        value: option?.Range?.To,
                        message: 'Capacity should be at most 1000',
                      },
                      // valueAsNumber: true,
                    })}
                    type='number'
                  />
                )}
                {option.Type === 'Collection' && (
                  <select {...register(option.Name)}>
                    {console.log(option.Name)}
                    {Object.keys(option.Values).map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={index === 0 ? 'default' : item}
                        >
                          {item} : {option.Values[item]}
                        </option>
                      );
                    })}
                  </select>
                )}

                {option.Type === 'String' && (
                  <input type='text' {...register(option.Name)} />
                )}
              </div>
            );
          })}

          {/* <input defaultValue='test' {...register('example')} type='radio' /> */}
          <div className='grid col-end-3 mt-8'>
            <Button isSelector={false} type='submit' className='w-full ml-auto'>
              Add Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FileOptions;
