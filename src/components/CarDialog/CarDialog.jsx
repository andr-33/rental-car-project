import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
  Stack,
  FormControl,
  FormLabel,
} from '@mui/material';

import {
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon
} from '@mui/icons-material';

import { useLanguage } from '../../contexts/LanguageContext';
import { useNotification } from '../../contexts/NotificationContext';

import ImageUpload from '../ImageUpload/ImageUpload';
import axios from 'axios';


const CarDialog = ({ open, onClose, onSave, car = null }) => {
  const [formData, setFormData] = useState({
    model: '',
    year: '',
    license_plate: '',
    daily_price: '',
    available: true,
    transmission: '',
    engine: '',
    seats: 0,
    drive: '',
    image: ''
  });

  const { translation } = useLanguage();
  const { updateNotification, openNotification } = useNotification();

  useEffect(() => {
    if (car) {
      setFormData(car);
    } else {
      setFormData({
        model: '',
        year: '',
        license_plate: '',
        daily_price: '',
        available: true,
        image: ''
      });
    }
  }, [car, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (imageData) => {
    setFormData(prev => ({
      ...prev,
      image: imageData
    }));
  };

  const handleToggleAvailability = () => {
    setFormData(prev => ({
      ...prev,
      available: !prev.available
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/car/create', formData);
      updateNotification('createCarSuccess', 'success');
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.error.message);
      updateNotification(error.response.data.error.code, 'error');
    }

    onClose();
    openNotification();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <DialogTitle>{car ? translation('editCar') : translation('addCar')}</DialogTitle>
        <IconButton
          size="small"
          onClick={handleToggleAvailability}
          sx={{ pr: 3 }}
        >
          {formData.available ?
            <ToggleOnIcon fontSize='large' color='success' /> :
            <ToggleOffIcon fontSize='large' />
          }
        </IconButton>
      </Stack>
      <DialogContent sx={{ pt: 0 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <ImageUpload
                value={formData.image}
                onChange={handleImageChange}
              />
          </Grid>
          <Grid size={12}>
            <Grid container spacing={1}>
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel
                    required
                    sx={{
                      fontSize: '16px'
                    }}
                  >
                    {translation('carModel')}
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel
                    required
                    sx={{
                      fontSize: '16px'
                    }}
                  >
                    {translation('carYear')}
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="year"
                    type="number"
                    value={formData.year}
                    placeholder={new Date().getFullYear()}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel
                    required
                    sx={{
                      fontSize: '16px'
                    }}
                  >
                    {translation('licensePlate')}
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="license_plate"
                    value={formData.license_plate}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel
                    required
                    sx={{
                      fontSize: '16px'
                    }}
                  >
                    {translation('dailyPrice')}
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="daily_price"
                    type="number"
                    value={formData.daily_price}
                    placeholder='$0.00'
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel
                    required
                    sx={{
                      fontSize: '16px'
                    }}
                  >
                    {translation('transmission')}
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="transmission"
                    type="text"
                    value={formData.transmission}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel
                    required
                    sx={{
                      fontSize: '16px'
                    }}
                  >
                    {translation('engine')}
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="engine"
                    type="text"
                    value={formData.engine}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel
                    required
                    sx={{
                      fontSize: '16px'
                    }}
                  >
                    {translation('seats')}
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="seats"
                    type="number"
                    value={formData.seats}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <FormControl fullWidth>
                  <FormLabel
                    required
                    sx={{
                      fontSize: '16px'
                    }}
                  >
                    {translation('drive')}
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="drive"
                    type="text"
                    value={formData.drive}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>
          {translation('cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {car ? translation('update') : translation('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarDialog;