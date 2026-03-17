import { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [popup, setPopup] = useState({ open: false, name: '', email: '', message: '' });

  const showPopup = (name, email, message) =>
    setPopup({ open: true, name, email, message });

  const hidePopup = () =>
    setPopup(p => ({ ...p, open: false }));

  return (
    <PortfolioContext.Provider value={{ popup, showPopup, hidePopup }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => useContext(PortfolioContext);
