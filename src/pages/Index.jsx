import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Divider,
  useTheme
} from '@mui/material';
import {
  Instagram,
  YouTube,
  X,
  Language,
  Search
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

import { useLanguage } from '../contexts/LanguageContext';
import { airports } from '../data/airportsData';

import { OverviewProvider, useOverview } from '../contexts/OverViewContext';
import CarList from '../components/CarList/CarList';
import OverviewDialog  from '../components/OverviewDialog/OverviewDialog';

const Index = () => {
  const { language, toggleLanguage, translation } = useLanguage();
  const { overview, updateOverview } = useOverview();
  const theme = useTheme();
  console.log(overview);

  const [selectedAirport, setSelectedAirport] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [showCars, setShowCars] = useState(false);

  dayjs.locale(language);

  const calculateRentalDays = () => {
    if (pickupDate && returnDate) {
      const days = dayjs(returnDate).diff(dayjs(pickupDate), 'day');
      return days > 0 ? days : 0;
    }
    return 0;
  };

  const handleSearch = () => {
    if (selectedAirport && pickupDate && returnDate) {
      setShowCars(true);
    }
  };

  const rentalDays = calculateRentalDays();

  useEffect(()=>{
    updateOverview("pickup_date", pickupDate);
  }, [pickupDate]);

  useEffect(()=>{
    updateOverview("return_date", returnDate);
  }, [returnDate]);

  useEffect(()=>{
    updateOverview("days", rentalDays);
  }, [rentalDays]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={language}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {translation('title')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                component="a"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTube />
              </IconButton>
              <IconButton
                color="inherit"
                component="a"
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <X />
              </IconButton>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Button
              color="inherit"
              startIcon={<Language />}
              onClick={toggleLanguage}
            >
              {language === 'es' ? 'EN' : 'ES'}
            </Button>
          </Toolbar>
        </AppBar>

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
              }}
            >
              {translation('heroSubtitle')}
            </Typography>
            <Paper elevation={3} sx={{ py: 3, mx: 2, borderRadius: 3 }}>
              <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                  <FormControl fullWidth>
                    <InputLabel>{translation('selectAirport')}</InputLabel>
                    <Select
                      value={selectedAirport}
                      label={translation('selectAirport')}
                      onChange={(e) => {
                        const airport = airports.find(
                          (airport) => airport.id === e.target.value
                        );
                        setSelectedAirport(airport.id);
                        updateOverview("airport_id", airport.id);
                        updateOverview("airport_city", airport.city);
                      }}
                    >
                      {airports.map((airport) => (
                        <MenuItem key={airport.id} value={airport.id}>
                          {airport.code} - {airport.city}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                  <DateTimePicker
                    label={translation('pickupDate')}
                    value={pickupDate}
                    onChange={setPickupDate}
                    minDate={dayjs()}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                  <DateTimePicker
                    label={translation('returnDate')}
                    value={returnDate}
                    onChange={setReturnDate}
                    minDate={pickupDate || dayjs()}
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 2.4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={<Search />}
                    onClick={handleSearch}
                    disabled={!selectedAirport || !pickupDate || !returnDate}
                    sx={{ height: 56, borderRadius: "1em"}}
                  >
                    {translation('searchCars')}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
        <CarList 
          rentalDays={rentalDays} 
          translation={translation} 
          showCars={showCars} 
        />
      </Box>
      <OverviewDialog />
    </LocalizationProvider>
  );
};

export default () => (
  <OverviewProvider>
    <Index />
  </OverviewProvider>
);