import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

import { useLanguage } from '../contexts/LanguageContext';
import { OverviewProvider, useOverview } from '../contexts/OverViewContext';
import { NotificationProvider, useNotification } from '../contexts/NotificationContext';

import CarList from '../components/CarList/CarList';
import OverviewDialog from '../components/OverviewDialog/OverviewDialog';
import HomeAppBar from '../components/HomeAppBar/HomeAppBar';
import Notification from '../components/Notification/Notification';

const INITIAL_VALUES = {
  airport_code: '',
  airport_city: '',
  pickup_date: null,
  return_date: null,
  rental_days: 0,
};

const Index = () => {
  const [airportsData, setAirportsData] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const [showCars, setShowCars] = useState(false);

  const { language, translation } = useLanguage();
  const { updateOverview } = useOverview();
  const { notification, closeNotification, updateNotification, openNotification } = useNotification();

  dayjs.locale(language);

  const handleCalculateRentalDays = () => {
    const { pickup_date, return_date } = formData;

    if (pickup_date && return_date) {
      const days = dayjs(return_date).diff(dayjs(pickup_date), 'day');

      setFormData(prev => ({
        ...prev,
        rental_days: days
      }));

      updateOverview("rental_days", days);
    }
    return;
  };

  const handleSearch = () => {
    const { airport_code, pickup_date, return_date } = formData;

    if (airport_code && pickup_date && return_date) {
      setShowCars(true);
    }
  };

  const handleSetLocalData = () => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleAirportChange = (e) => {
    const { value } = e.target;
    const airport = airportsData.find(
      (airport) => airport.code === value
    );
    
    setFormData(prev => ({
      ...prev,
      airport_code: airport.code,
      airport_city: airport.city
    }));

    updateOverview("airport_code", airport.code);
    updateOverview("airport_city", airport.city);
  };

  const handleDateChange = (date, type) => {
    setFormData(prev => ({
      ...prev,
      [type]: date
    }));
    updateOverview(type, date);
  };

  useEffect(() => {
    if (formData.pickup_date && formData.return_date) {
      handleCalculateRentalDays();
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [formData.pickup_date, formData.return_date]);

  useEffect(() => {
    const localData = sessionStorage.getItem("formData");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setFormData({
        ...parsedData,
        return_date: parsedData.return_date ? dayjs(parsedData.return_date) : null,
        pickup_date: parsedData.pickup_date ? dayjs(parsedData.pickup_date) : null,
      });
    }
  }, []);

  useEffect(() => {
    const fetchAirportsData = async () => {
      try {
        const airportsData = await axios.get("/api/airport/all-airports");
        setAirportsData(airportsData.data);
      } catch (error) {
        console.error(error.response.data.error.message);
        updateNotification(error.response.data.error.code, "error");
        openNotification();
      }
    };
    fetchAirportsData();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
      <Box sx={{ flexGrow: 1 }}>
        <HomeAppBar />
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: showCars ? "40vh" : "100vh",
            transition: "height 0.4s ease",
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              zIndex: -2
            }}
          >
            <Box
              component={"img"}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "blur(4px)",
                transform: "scale(1.1)",
                transition: "transform 0.8s ease-in-out",
              }}
              src="images/pareja-coche.jpg"
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "2.25rem", md: "3rem" },
              }}
            >
              {translation('heroSubtitle')}
            </Typography>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, md: 3 },
                mx: { xs: 2, md: 3 },
                borderRadius: 3
              }}
            >
              <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>{translation('selectAirport')}</InputLabel>
                    <Select
                      value={formData.airport_code}
                      label={translation('selectAirport')}
                      onChange={event => handleAirportChange(event)}
                    >
                      {airportsData.map((airport) => (
                        <MenuItem key={airport.id} value={airport.code}>
                          {airport.code} - {airport.city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                  <DateTimePicker
                    label={translation('pickupDate')}
                    value={formData.pickup_date}
                    onChange={date => handleDateChange(date, "pickup_date")}
                    minDate={dayjs()}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                  <DateTimePicker
                    label={translation('returnDate')}
                    value={formData.return_date}
                    onChange={date => handleDateChange(date, "return_date")}
                    minDate={dayjs()}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={<Search />}
                    onClick={()=>{
                      handleSearch();
                      handleSetLocalData();
                    }}
                    disabled={disableButton}
                    sx={{ height: 56, borderRadius: "1em" }}
                  >
                    {translation('searchCars')}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
        <CarList
          rentalDays={formData.rental_days}
          translation={translation}
          showCars={showCars}
        />
      </Box>
      <OverviewDialog />
      <Notification
        notification={notification}
        closeNotification={closeNotification}
      />
    </LocalizationProvider>
  );
};

export default () => (
  <NotificationProvider>
    <OverviewProvider>
      <Index />
    </OverviewProvider>
  </NotificationProvider>
);