// TotalWinningsContext.js
import React, { createContext, useState } from 'react';

export const TotalWinningsContext = createContext();

export const TotalWinningsProvider = ({ children }) => {
  const [totalWinnings, setTotalWinnings] = useState(0);

  return (
    <TotalWinningsContext.Provider value={{ totalWinnings, setTotalWinnings }}>
      {children}
    </TotalWinningsContext.Provider>
  );
};
