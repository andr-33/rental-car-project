import { createContext, useContext, useState} from 'react';

const OverviewContext = createContext();

export const useOverview = () => {
  const context = useContext(OverviewContext);

  if (!context) {
    throw new Error('useOverview must be used within an OverviewProvider');
  }
  return context;
};

export const OverviewProvider = ({ children }) => {
  const [overview, _setOverview] = useState({
    airport_id: "",
    card_id: null,
    pickup_date: null,
    return_date: null,
    days: 0,
    total_amount: 0.0,
  });

  const updateOverview = (key, value) =>{
    _setOverview(prev => ({
      ...prev,
      [key]: value,
    }))
  };

  return (
    <OverviewContext.Provider value={{ overview, updateOverview }}>
      {children}
    </OverviewContext.Provider>
  );
};