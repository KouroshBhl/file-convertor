import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

export type PickedFilesType = {
  formatTo: string;
  file: File;
  extname: string;
  supported: boolean;
  base64: string;
  parameters: any;
  results: {};
  fileUniqueID: number;
};

export type UploadPercentageType = {
  fileUniqueID: number;
  estimated: number;
  loaded: number;
  progress: number;
  started: boolean;
};

export type FilePickerContextType = {
  pickedFiles: Array<PickedFilesType>;
  setPickedFiles: (value: any) => any;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  isError: boolean;
  setIsError: (value: boolean) => void;
  canUpload: boolean;
  setCanUpload: (value: boolean) => void;
  uploadPercentage: Array<UploadPercentageType>;
  setUploadPercentage: (value: any) => void;
  setShowFrom: (value: any) => any;
  showTo: boolean;
  setShowTo: (value: any) => any;
  showFrom: boolean;
};

type FilePickerWrapperContextprops = {
  children: ReactNode;
};

const AppContext = createContext<FilePickerContextType>(
  {} as FilePickerContextType
);

export function FilePickerWrapperContext({
  children,
}: FilePickerWrapperContextprops) {
  const [pickedFiles, setPickedFiles] = useState<Array<PickedFilesType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [canUpload, setCanUpload] = useState<boolean>(false);
  const [showFrom, setShowFrom] = useState<boolean>(false);
  const [showTo, setShowTo] = useState<boolean>(false);
  const [uploadPercentage, setUploadPercentage] = useState<
    Array<UploadPercentageType>
  >([]);

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
        showFrom,
        setShowFrom,
        showTo,
        setShowTo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useFilePicker(): FilePickerContextType {
  if (AppContext === undefined)
    throw new Error(
      'useFilePicker must be used within a FilePickerWrapperContext'
    );

  return useContext(AppContext);
}
