import React, { createContext, useContext, useState } from 'react';

const MetronomeScreenOption = createContext();

export const MetronomeScreenProvider = ({ children }) => {
  const [metronomeType, setMetronomeType] = useState('slider'); 
  
  return (
    <MetronomeScreenOption.Provider value={{ metronomeType, setMetronomeType }}>
      {children}
    </MetronomeScreenOption.Provider>
  );
};

export const useMetronomeScreen = () => useContext(MetronomeScreenOption);