import {
  Box,
  Card,
  CardContent,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import { useLanguage } from "../../contexts/LanguageContext";
import { useOverview } from "../../contexts/OverViewContext";

const StepSecction = ({ steps, activeStep }) => {
  const { translation } = useLanguage();
  const { overview } = useOverview();

  return (
    <>
      {/* Desktop Stepper */}
      <Stepper
        activeStep={activeStep}
        sx={{ 
          width: '100%',
          display: { xs: 'none', md: 'flex' }
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{translation(label)}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Mobile Stepper */}
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
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          width: '100%',
          display: { sm: 'flex', md: 'none' }
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '120px' } }}
            >
              {translation(label)}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default StepSecction;