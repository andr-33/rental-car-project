import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Divider,
  Modal,
  Backdrop,
} from '@mui/material';
import { People, Settings, AcUnit } from '@mui/icons-material';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const CarCard = ({ car, rentalDays }) => {
  const { translation } = useLanguage();
  const totalPrice = rentalDays > 0 ? car.pricePerDay * rentalDays : 0;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          p: 2,
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: 3,
          border: '1px solid #ccc',
          transition: 'box-shadow 0.3s ease-in',
          '&:hover': { boxShadow: 6 },
        }}
      >
        {/* Imagen */}
        <Box
          component="img"
          src={car.images[0]}
          alt={car.name}
          onClick={handleOpen}
          sx={{
            width: { xs: '100%', md: 220 },
            height: { xs: 180, md: 140 },
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
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {car.name}
          </Typography>
          <Chip label={car.category} color="primary" size="small" sx={{ my: 1 }} />

          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <People fontSize="small" color="action" />
                <Typography variant="body2">{car.passengers}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Settings fontSize="small" color="action" />
                <Typography variant="body2">
                  {car.transmission === 'automatic'
                    ? translation('automatic')
                    : translation('manual')}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <AcUnit fontSize="small" color="action" />
                <Typography variant="body2">
                  {car.airConditioning ? translation('yes') : translation('no')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Box
          sx={{
            minWidth: 160,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {translation('pricePerDay')}
          </Typography>
          <Typography variant="h6" color="primary">
            {car.pricePerDay} € / día
          </Typography>

          {rentalDays > 0 && (
            <Typography variant="body2" color='text.secondary'>
              {translation('totalPrice')}:&nbsp;
              <Typography 
                component={'span'} 
                variant='body1' 
                fontWeight='bold' 
                color="#D9583B"
              >
                {totalPrice} €
              </Typography>
            </Typography>
          )}

          <Button
            variant="contained"
            color="warning"
            size="large"
            disabled={rentalDays === 0}
            sx={{ borderRadius: 2 }}
          >
            {translation('rentNow')}
          </Button>
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
            width: { xs: '80%', sm: '70%', md: '50%' },
            bgcolor: 'transparent',
            boxShadow: 0,
            p: 2,
          }}
        >
          <Box
            component="img"
            src={car.images[0]}
            alt={`Enlarged view of ${car.name}`}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: 2,
              border: '2px solid #fff',
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default CarCard;