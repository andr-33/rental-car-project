import { forwardRef, useState } from 'react';
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Grid,
  Button,
} from '@mui/material';
import { Close, ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';
import { useOverview } from '../../contexts/OverViewContext';

import ContactDetailsForm from '../ContactDetailsForm/ContactDetailsForm';
import PriceDeatils from '../PriceDetails/PriceDetails';
import StepSection from '../StepSection/StepSection';
import Review from '../Review/Review';
import Confirmation from '../Confirmation/Confirmation';

import axios from 'axios';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const steps = ['contactDetail', 'review'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ContactDetailsForm />;
    case 1:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const OverviewDialog = () => {
  const [activeStep, setActiveStep] = useState(0);

  const isLastStep = activeStep === steps.length - 1;

  const { translation } = useLanguage();
  const { overview, contactDetails, openOverviewDialog, toggleOverviewDialog } = useOverview();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmitRequestReservation = async () =>{
    const rentalData = {...contactDetails, ...overview }
    try{
      const response = await axios.post('/api/rental/create', rentalData, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.error.message);
    }
  };

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
        {/*Columna izquierda*/}
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
            pb: 2,
            px: 3,
            gap: 1,
          }}
        >
          <Box
            component="img"
            src={overview.car_main_image}
            alt={overview.model}
            sx={{
              width: 270,
              height: 172,
              objectFit: 'contain',
            }}
          />
          <PriceDeatils />
        </Grid>

        {/*Columna derecha*/}
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'center',
            pt: { xs: 0, sm: 10 },
            px: { xs: 2, sm: 8 },
            pb: 2,
            gap: 2
          }}
        >
          <StepSection steps={steps} activeStep={activeStep} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              getStepContent(activeStep)
            )}
          </Box>
          <Box
            sx={[
              {
                display: 'flex',
                flexGrow: 1,
                alignItems: "end",
                flexDirection: { xs: 'column-reverse', sm: 'row' },
                width: '100%',
                gap: 1,
                pb: { xs: 12, sm: 0 },
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
              onClick={isLastStep ? handleSubmitRequestReservation : handleNext}
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
            >
              {isLastStep ? translation("requestReservation") : translation("next")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default OverviewDialog;