import React, { createContext, useContext } from 'react';

export const PaginationContext = createContext();

export const PaginationContextProvider = ({ children, value }) => {
  return (
    <PaginationContext.Provider
      value={{
        ...value,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export function usePaginationContext() {
  return useContext(PaginationContext);
}
