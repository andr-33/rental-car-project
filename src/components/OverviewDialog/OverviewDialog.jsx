import { forwardRef, useState } from 'react';
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import { Close, ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';
import { useOverview } from '../../contexts/OverViewContext';

import BillingForm from '../BillingForm/BillingForm';
import PriceDeatils from '../PriceDetails/PriceDetails';

import dayjs from 'dayjs';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ['Datos de usuario', 'Review your order'];

function getStepContent(step, overview, translation) {
  switch (step) {
    case 0:
      return <BillingForm/>;
    case 1:
      return (
        <>
          <Typography variant="h5" gutterBottom>
            {translation("rentalSummary")}
          </Typography>
          <Typography variant="body1">
            {translation("selectedCar")}: {overview.car_name} ({translation("orSimilar")})
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6">{translation("pickup")}</Typography>
              <Typography variant="body2">
                {overview.airport_code} - {overview.airport_city}
              </Typography>
              <Typography variant="body2">
                {dayjs(overview.pickup_date).format('DD/MM/YYYY HH:mm')}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6">{translation("return")}</Typography>
              <Typography variant="body2">
                {overview.airport_code} - {overview.airport_city}
              </Typography>
              <Typography variant="body2">
                {dayjs(overview.return_date).format('DD/MM/YYYY HH:mm')}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">
            {translation("days")}: {overview.days}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Total: {overview.total_amount?.toFixed(2) || "0.00"} €
          </Typography>
        </>
      );
    default:
      throw new Error('Unknown step');
  }
}

const OverviewDialog = () => {
  const [activeStep, setActiveStep] = useState(0);

  const theme = useTheme();
  const { translation } = useLanguage();
  const { overview, openOverviewDialog, toggleOverviewDialog } = useOverview();
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  console.log(overview);

  return (
    <Dialog
      fullScreen
      open={openOverviewDialog}
      slots={{
        transition: Transition,
      }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {translation("rentalOverview")}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleOverviewDialog}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid
        container
        sx={{
          height: {
            xs: '100%',
            sm: 'calc(100dvh - var(--template-frame-height, 0px))',
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'center',
            pt: 6,
            px: 3,
            gap: 1,
          }}
        >
          <Box
            component="img"
            src={overview.car_main_image}
            alt={overview.car_name}
            sx={{
              width: { xs: '100%', md: 270 },
              height: { xs: 180, md: 172 },
              objectFit: 'contain',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              borderRadius: 3,
              p: 2,
              border: '1px solid #ccc',
            }}
          >
            <Typography variant="h5">{overview.car_name} ({translation("orSimilar")})</Typography>
            <PriceDeatils totalPrice={overview.total_amount} />
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'center',
            pt: { xs: 0, sm: 12 },
            px: { xs: 2, sm: 8 },
            gap: { xs: 2, md: 4 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: '100%', height: 40,}}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                {translation("selectedCar")}
              </Typography>
              <Typography variant="body1">
                {overview.car_name} ({translation("orSimilar")})
              </Typography>
              <Typography variant="body1">
                Total: {overview.total_amount?.toFixed(2) || "0.00"} €
              </Typography>
          
              <Stack spacing={1}>
                <Typography variant="body2">
                  {translation("days")}: {overview.days}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">{translation("reservationRequested")}</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {translation("reservationConfirmationMessage")}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                  onClick={toggleOverviewDialog}
                >
                  {translation("close")}
                </Button>
              </Stack>
            ) : (
              <>
                {getStepContent(activeStep, overview, translation)}
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRounded />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      {translation("previous")}
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRounded />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                      {translation("previous")}
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRounded />}
                    onClick={handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 1 ? translation("requestReservation") : translation("next")}
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default OverviewDialog;