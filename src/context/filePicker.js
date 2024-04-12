import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function FilePickerWrapperContext({ children }) {
  const [pickedFiles, setPickedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [canUpload, setCanUpload] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState([]);

  return (
    <AppContext.Provider
      value={{
        pickedFiles,
        setPickedFiles,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        canUpload,
        setCanUpload,
        uploadPercentage,
        setUploadPercentage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useFilePicker() {
  return useContext(AppContext);
}