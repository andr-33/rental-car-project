import { forwardRef, use, useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { Close, ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';
import { useOverview } from '../../contexts/OverViewContext';
import { useAuth } from '../../contexts/AuthContext';
import { NotificationProvider, useNotification } from '../../contexts/NotificationContext';

import Notification from '../Notification/Notification';
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

const OverviewDialogContent = () => {
  const [activeStep, setActiveStep] = useState(0);

  const isLastStep = activeStep === steps.length - 1;

  const { translation } = useLanguage();
  const { overview, contactDetails, openOverviewDialog, toggleOverviewDialog } = useOverview();
  const { sessionToken } = useAuth();
  const { openNotification, updateNotification, closeNotification, notification } = useNotification();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ContactDetailsForm errors={errors} />;
      case 1:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    if (activeStep === 0) {
      const newErrors = {};
      let isValid = true;
      const requiredFields = ['address', 'country', 'city', 'zip_code', 'phone'];

      requiredFields.forEach(field => {
        if (!contactDetails[field]) {
          newErrors[field] = true;
          isValid = false;
        }
      });

      setErrors(newErrors);

      if (!isValid) {
        updateNotification('fillRequiredFields', 'error');
        openNotification();
        return;
      }
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getNextButtonProps = () => {
    if (activeStep === steps.length) {
      return {
        label: translation("close"),
        onClick: toggleOverviewDialog,
      }
    }

    if (isLastStep) {
      return {
        label: translation("requestReservation"),
        onClick: handleSubmitRequestReservation,
        loading: loading,
      }
    }

    return {
      label: translation("next"),
      onClick: handleNext,
      icon: <ChevronRightRounded />,
    }
  };

  const getBackButtonProps = () => {
    if (activeStep === 0 || !isLastStep) {
      return {
        hidden: true,
        label: "",
        onClick: handleBack,
      }
    }

    return {
      label: translation("previous"),
      onClick: handleBack,
      icon: <ChevronLeftRounded />,
      hidden: false,
    }
  };

  const handleSubmitRequestReservation = async () => {
    setLoading(true);
    const rentalData = { ...contactDetails, ...overview }
    try {
      await axios.post('/api/rental/create-request', rentalData, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      handleNext();
    } catch (error) {
      console.error(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  const nextButtonProps = getNextButtonProps();
  const backButtonProps = getBackButtonProps();

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
                variant="outlined"
                fullWidth
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                {translation("previous")}
              </Button>
            )}

            <Button
              startIcon={backButtonProps?.icon}
              onClick={backButtonProps.onClick}
              variant="text"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {backButtonProps.label}
            </Button>

            <Button
              variant="contained"
              endIcon={nextButtonProps?.icon}
              onClick={nextButtonProps.onClick}
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
              disabled={nextButtonProps.loading}
            >
              {nextButtonProps.loading ? <CircularProgress size={24} color="inherit" /> : nextButtonProps.label}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Notification notification={notification} closeNotification={closeNotification} />
    </Dialog>
  );
};

const OverviewDialog = () => {
  return (
    <NotificationProvider>
      <OverviewDialogContent />
    </NotificationProvider>
  );
};

export default OverviewDialog;