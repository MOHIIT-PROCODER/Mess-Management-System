import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedHostel, setSelectedHostel] = useState({
    id: 'a1b2c3d4-0000-0000-0000-000000000001',
    name: 'Aryabhata Boys Hostel',
    code: 'ABH-1'
  });

  const [activeNotification, setActiveNotification] = useState(null);

  const notify = (message, type = 'info') => {
    setActiveNotification({ message, type });
    setTimeout(() => setActiveNotification(null), 4000);
  };

  return (
    <AppContext.Provider value={{ selectedHostel, setSelectedHostel, activeNotification, notify }}>
      {children}
    </AppContext.Provider>
  );
};
