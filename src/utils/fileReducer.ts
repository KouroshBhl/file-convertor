export enum ActionDomain {
  SELECT_FILES = 'SELECT_FILES',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  HANDLE_REMOVE_FILE = 'HANDLE_REMOVE_FILE',
  SET_FORMAT_TO = 'SET_FORMAT_TO',
  SET_FILE_PARAMETERS = 'SET_FILE_PARAMETERS',
  SET_FILE_UPLOAD_STATUS = 'SET_FILE_UPLOAD_STATUS',
  SET_FILE_RESULTS = 'SET_FILE_RESULTS',
}

export interface FileType {
  file: File;
  fileUniqueId: string;
  extname: string;
  supported: Array<string>;
  base64: string;
  formatTo: string | null;
  parameters: string[];
  results: {
    isResults: boolean;
    FileExt: string;
    FileId: string;
    FileName: string;
    FileSize: number;
    Url: string;
  };
  isError: boolean;
  isLoading: boolean;
  showFrom: boolean;
  showTo: boolean;
  uploadStarted: boolean;
  uploadProgress: number;
  uploadEstimated: number;
}

interface SelectFilesAction {
  type: ActionDomain.SELECT_FILES;
  payload: FileType[];
}
interface SetLoadingAction {
  type: ActionDomain.SET_LOADING;
  payload: boolean;
}
interface SetErrorAction {
  type: ActionDomain.SET_ERROR;
  payload: boolean;
}
interface HandleRemoveFileAction {
  type: ActionDomain.HANDLE_REMOVE_FILE;
  payload: string;
}
interface SetFormatToAction {
  type: ActionDomain.SET_FORMAT_TO;
  payload: { fileUniqueId: string; to: string };
}

interface SetFileParametersAction {
  type: ActionDomain.SET_FILE_PARAMETERS;
  payload: { fileUniqueId: string; params: string[] };
}
interface SetFileUploadStatusAction {
  type: ActionDomain.SET_FILE_UPLOAD_STATUS;
  payload: { progressEvent: any; fileUniqueId: string };
}
interface SetFileResultsAction {
  type: ActionDomain.SET_FILE_RESULTS;
  payload: any[];
}

export type ActionType =
  | SelectFilesAction
  | SetLoadingAction
  | SetErrorAction
  | HandleRemoveFileAction
  | SetFormatToAction
  | SetFileParametersAction
  | SetFileUploadStatusAction
  | SetFileResultsAction;

export interface StateType {
  pickedFiles: FileType[];
  isLoading: boolean;
  isError: boolean;
  fileResults: {
    isCompleted: boolean;
    files: string[];
  };
}

export function fileReducer(state: StateType, action: ActionType) {
  const { type, payload } = action;

  switch (type) {
    case ActionDomain.SELECT_FILES:
      return {
        ...state,
        pickedFiles: [...state.pickedFiles, ...payload],
      };

    case ActionDomain.SET_LOADING:
      return { ...state, isLoading: payload };

    case ActionDomain.SET_ERROR:
      return { ...state, isError: payload };

    case ActionDomain.HANDLE_REMOVE_FILE:
      return {
        ...state,
        pickedFiles: state.pickedFiles.filter(
          (file) => file.fileUniqueId !== payload
        ),
      };

    case ActionDomain.SET_FORMAT_TO:
      return {
        ...state,
        pickedFiles: state.pickedFiles.map((file) =>
          file.fileUniqueId === payload.fileUniqueId
            ? { ...file, formatTo: payload.to }
            : file
        ),
      };

    case ActionDomain.SET_FILE_PARAMETERS:
      return {
        ...state,
        pickedFiles: state.pickedFiles.map((file) =>
          file.fileUniqueId === payload.fileUniqueId
            ? { ...file, parameters: payload.params }
            : file
        ),
      };

    case ActionDomain.SET_FILE_UPLOAD_STATUS:
      return {
        ...state,
        pickedFiles: state.pickedFiles.map((file) =>
          file.fileUniqueId === payload.fileUniqueId
            ? {
                ...file,
                uploadStarted: true,
                uploadProgress: Math.round(
                  payload.progressEvent.progress * 100
                ),
                uploadEstimated: payload.progressEvent.estimated,
              }
            : file
        ),
      };

    case ActionDomain.SET_FILE_RESULTS:
      const formatResults = payload.reduce((acc, curr) => {
        const { data, config } = curr;
        return [
          ...acc,
          {
            file: data.Files[0],
            fileUniqueId: JSON.parse(config.data).fileUniqueID,
          },
        ];
      }, []);

      const allFileIds = formatResults.map((file: any) => {
        return { Id: file.file.FileId };
      });
      return {
        ...state,
        fileResults: {
          isCompleted: true,
          files: allFileIds,
        },
        pickedFiles: state.pickedFiles.map((file, i) =>
          file.fileUniqueId === formatResults[i].fileUniqueId
            ? {
                ...file,
                results: { ...formatResults[i].file, isResults: true },
              }
            : file
        ),
      };

    default:
      throw new Error('No Action Found!');
  }
}
