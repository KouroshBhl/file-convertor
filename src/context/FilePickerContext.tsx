import { type StateType, fileReducer } from '@/utils/fileReducer';
import React, {
  type ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';

type FilePickerWrapperContextprops = {
  children: ReactNode;
};

const initialState: StateType = {
  pickedFiles: [],
  isLoading: false,
  isError: false,
};

const AppContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export function FilePickerWrapperContext({
  children,
}: FilePickerWrapperContextprops) {
  const [state, dispatch] = useReducer(fileReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useFilePicker() {
  if (AppContext === undefined)
    throw new Error(
      'useFilePicker must be used within a FilePickerWrapperContext'
    );

  return useContext(AppContext);
}
