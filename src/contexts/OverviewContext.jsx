import { createContext, useContext, useState } from 'react';

const OverviewContext = createContext();

export const useOverview = () => {
  const context = useContext(OverviewContext);

  if (!context) {
    throw new Error('useOverview must be used within an OverviewProvider');
  }
  return context;
};

const INITIAL_VALUES_CONTACT_DETAILS = {
  full_name: "",
  address: "",
  country: "",
  city: "",
  zip_code: "",
  passport: "",
  phone: "",
};

const INITIAL_VALUES_OVERVIEW = {
  airport_code: "",
  airport_city: "",
  car_id: null,
  model: null,
  car_main_image: null,
  pickup_date: null,
  return_date: null,
  days: 0,
  total_amount: 0.0,
};

export const OverviewProvider = ({ children }) => {
  const [overview, _setOverview] = useState(INITIAL_VALUES_OVERVIEW);
  const [contactDetails, setContactDetails] = useState(INITIAL_VALUES_CONTACT_DETAILS);
  const [openOverviewDialog, _setOpenOverviewDialog] = useState(false);

  const updateOverview = (key, value) => {
    _setOverview(prev => ({
      ...prev,
      [key]: value,
    }))
  };

  const toggleOverviewDialog = () => {
    _setOpenOverviewDialog(!openOverviewDialog);
  };


  return (
    <OverviewContext.Provider
      value={{
        overview,
        updateOverview,
        openOverviewDialog,
        toggleOverviewDialog,
        contactDetails,
        setContactDetails
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};