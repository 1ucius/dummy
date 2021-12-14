import React, { createContext, useContext } from 'react';

const SidebarContext = createContext();

const SidebarContextProvider = ({ children }) => {
  const [sidebarOpened, setSidebarOpened] = React.useState(true);

  return (
    <SidebarContext.Provider value={{ sidebarOpened, setSidebarOpened }}>
      {children}
    </SidebarContext.Provider>
  );
};

function useSidebar() {
  return useContext(SidebarContext);
}

export { SidebarContext, SidebarContextProvider, useSidebar };
