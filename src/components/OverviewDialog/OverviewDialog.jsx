import { forwardRef } from 'react';
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  CardContent,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';
import { useOverview } from '../../contexts/OverViewContext';

import dayjs from 'dayjs';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OverviewDialog = () => {
  const { translation } = useLanguage();
  const { overview, openOverviewDialog, toggleOverviewDialog } = useOverview();

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
      <Box sx={{ m: { xs: 1, md: 4 }, p: 2 }}>
        <CardContent>
          <Typography variant="h6">{translation("selectedCar")}</Typography>
          <Typography variant="body1">{overview.car_name} ({translation("orSimilar")})</Typography>

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
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
            >
              {translation("requestReservation")}
            </Button>
          </Box>
        </CardContent>
      </Box>
    </Dialog>
  );
};

export default OverviewDialog;