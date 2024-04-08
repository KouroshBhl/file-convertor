import React, { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const test = 'hello world';
  return <AppContext.Provider value={test}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
