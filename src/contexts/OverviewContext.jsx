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
    airport_city: "",
    car_id: null,
    car_name: null,
    pickup_date: null,
    return_date: null,
    days: 0,
    total_amount: 0.0,
  });
  const [openOverviewDialog, _setOpenOverviewDialog] = useState(false);

  const updateOverview = (key, value) =>{
    _setOverview(prev => ({
      ...prev,
      [key]: value,
    }))
  };

  const toggleOverviewDialog = () => {
    _setOpenOverviewDialog(!openOverviewDialog);
  };


  return (
    <OverviewContext.Provider value={{ overview, updateOverview, openOverviewDialog, toggleOverviewDialog }}>
      {children}
    </OverviewContext.Provider>
  );
};