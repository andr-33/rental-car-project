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
  Select,
  MenuItem,
} from '@mui/material';

import {
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon
} from '@mui/icons-material';

import { useLanguage } from '../../contexts/LanguageContext';
import { useNotification } from '../../contexts/NotificationContext';

import ImageUpload from '../ImageUpload/ImageUpload';
import SelectField from '../SelectField/SelectField';
import axios from 'axios';

const INITIAL_VALUES = {
  model: '',
  year: '',
  license_plate: '',
  daily_price: '',
  available: true,
  transmission: 'manual',
  engine: 'gasoline',
  seats: 0,
  drive: 'FWD',
  image: ''
}

const CarDialog = ({ open, onClose, car = null }) => {
  const [formData, setFormData] = useState(INITIAL_VALUES);

  console.log("Motoe: ", formData.engine);
  const { translation } = useLanguage();
  const { updateNotification, openNotification } = useNotification();

  useEffect(() => {
    if (car) {
      setFormData(car);
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
    } catch (error) {
      console.error(error.response.data.error.message);
      updateNotification(error.response.data.error.code, 'error');
    } finally {
      onClose();
      openNotification();
      setFormData(INITIAL_VALUES);
    }
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
                  />
                </FormControl>
              </Grid>
              <Grid size={6}>
                <SelectField
                  labelKey='transmission'
                  name='transmission'
                  value={formData.transmission}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value='manual'>
                    {translation('manual')}
                  </MenuItem>
                  <MenuItem value='automatic'>
                    {translation('automatic')}
                  </MenuItem>
                </SelectField>
              </Grid>
              <Grid size={6}>
                <SelectField
                  labelKey='engine'
                  name='engine'
                  value={formData.engine}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value='gasoline'>
                    {translation('gasoline')}
                  </MenuItem>
                  <MenuItem value='diesel'>
                    {translation('diesel')}
                  </MenuItem>
                  <MenuItem value='electric'>
                    {translation('electric')}
                  </MenuItem>
                  <MenuItem value='hybrid'>
                    {translation('hybrid')}
                  </MenuItem>
                </SelectField>
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
                <SelectField
                  labelKey={'drive'}
                  name={'drive'}
                  value={formData.drive}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value='FWD'>
                    {translation('frontWheelDrive')}
                  </MenuItem>
                  <MenuItem value='RWD'>
                    {translation('rearWheelDrive')}
                  </MenuItem>
                  <MenuItem value='AWD'>
                    {translation('allWheelDrive')}
                  </MenuItem>
                  <MenuItem value='4WD'>
                    {translation('fourWheelDrive')}
                  </MenuItem>
                </SelectField>
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