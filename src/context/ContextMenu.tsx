import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'

type ContextMenuContextType = {
  menuOptions: any[]
};

export const Context = createContext<ContextMenuContextType>({
  menuOptions: []
});

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation()
  const [menuOptions, setMenuOptions] = useState([]);

  useEffect(() => {
    console.log('LOCATION === ', location)
  }, [location])


  return (
    <Context.Provider
      value={{ menuOptions }}
    >
      {children}
    </Context.Provider>
  );
};