export enum ActionDomain {
  SELECT_FILES = 'SELECT_FILES',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  HANDLE_REMOVE_FILE = 'HANDLE_REMOVE_FILE',
  SET_FORMAT_TO = 'SET_FORMAT_TO',
  SET_FILE_PARAMETERS = 'SET_FILE_PARAMETERS',
  SET_FILE_UPLOAD_STATUS = 'SET_FILE_UPLOAD_STATUS',
}

export interface FileType {
  file: File;
  fileUniqueId: string;
  extname: string;
  supported: Array<string>;
  base64: string;
  formatTo: string | null;
  parameters: string[];
  results: {};
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
  payload: { ProgressEvent: any; fileUniqueId: string };
}

export type ActionType =
  | SelectFilesAction
  | SetLoadingAction
  | SetErrorAction
  | HandleRemoveFileAction
  | SetFormatToAction
  | SetFileParametersAction
  | SetFileUploadStatusAction;

export interface StateType {
  pickedFiles: FileType[];
  isLoading: boolean;
  isError: boolean;
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
                uploadProgress: payload.ProgressEvent.progress,
                uploadEstimated: payload.ProgressEvent.estimated,
              }
            : file
        ),
      };

    default:
      throw new Error('No Action Found!');
  }
}
