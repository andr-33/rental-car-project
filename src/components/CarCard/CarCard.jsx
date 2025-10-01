import {
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Divider,
  Modal,
  Backdrop,
  useTheme
} from '@mui/material';
import { People, Settings, AcUnit } from '@mui/icons-material';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useOverview } from '../../contexts/OverViewContext';


const CarCard = ({ car, rentalDays }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const { translation } = useLanguage();
  const { updateOverview, toggleOverviewDialog } = useOverview();
  const totalPrice = rentalDays > 0 ? car.daily_price * rentalDays : 0;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setOverviewInformation = () => {
    updateOverview("total_amount", totalPrice);
    updateOverview("car_id", car.id);
    updateOverview("car_name", car.name);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          p: 2,
          alignItems: 'center',
          justifyContent: "center",
          bgcolor: theme.palette.background.paper,
          borderRadius: 3,
          border: '1px solid #ccc',
          transition: 'box-shadow 0.3s ease-in',
          '&:hover': { boxShadow: 6 },
        }}
      >
        {/* Imagen */}
        <Box
          component="img"
          src={car.images[0]?.url}
          alt={car.name}
          onClick={handleOpen}
          sx={{
            width: { xs: '100%', md: 220 },
            height: { xs: 180, md: 140 },
            mb: { xs: 2, md: 0 },
            objectFit: 'contain',
            borderRadius: 2,
            bgcolor: 'grey.100',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.05)' },
          }}
          aria-label={`View enlarged image of ${car.name}`}
        />

        {/* Divider solo en desktop */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, display: { xs: 'none', md: 'block' } }}
        />

        {/* Detalles */}
        <Box 
          sx={{ 
            flex: 1, 
            px: 2, 
            width: "100%"
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {car.name}
          </Typography>
          <Grid container spacing={1}>
            <Grid size={6}>
              <Chip label={"Confort"} size="small" sx={{ mb: 1 }} />
              <Box display="flex" alignItems="center" gap={0.5}>
                <People fontSize="small" color="action" />
                <Typography variant="body2">{car.seats}</Typography>
                <AcUnit fontSize="small" color="action" />
                <Typography variant="body2">
                  {car.has_ac ? translation('yes') : translation('no')}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Settings fontSize="small" color="action" />
                <Typography variant="body2">
                  {car.transmission === 'automatic'
                    ? translation('automatic')
                    : translation('manual')}
                </Typography>
              </Box>
            </Grid>
            <Grid
              size={6}
              justifyItems={"end"}
            >
              <Typography variant="body2" color="text.secondary">
                {translation('pricePerDay')}
              </Typography>
              <Typography variant="h6" color="primary">
                {car.daily_price} € / día
              </Typography>

              {rentalDays > 0 && (
                <Typography variant="body2" color='text.secondary'>
                  {translation('totalPrice')}:&nbsp;
                  <Typography
                    component={'span'}
                    variant='body1'
                    fontWeight='bold'
                    color="error"
                  >
                    {totalPrice} €
                  </Typography>
                </Typography>
              )}
            </Grid>
          </Grid>
          <Box
            sx={{
              display: 'flex',
              mt: 1,
              justifyContent: { xs: 'center', md: 'flex-end' }
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              disabled={rentalDays === 0}
              onClick={() => {
                setOverviewInformation();
                toggleOverviewDialog();
              }}
              sx={{
                width: { xs: "100%", md: "auto" }
              }}
            >
              {translation('rentNow')}
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        }}
        aria-labelledby="enlarged-image-modal"
        aria-describedby={`Enlarged image of ${car.name}`}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: { xs: '95%', sm: '70%', md: '50%' },
            bgcolor: 'transparent',
            boxShadow: 0,
          }}
        >
          <Box
            component="img"
            src={car.images[0]?.url}
            alt={`Enlarged view of ${car.name}`}
            sx={{
              width: '100%',
              height: { xs: '25vh', sm: '50vh', md: '60vh' },
              objectFit: 'contain',
              borderRadius: 2,
              border: '2px solid #fff',
              background: theme.palette.background.paper,
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default CarCard;