import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  IconButton,
  Stack,
  MenuItem,
} from '@mui/material';

import {
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon
} from '@mui/icons-material';

import { useLanguage } from '../../contexts/LanguageContext';
import { useNotification } from '../../contexts/NotificationContext';
import { useCarContext } from '../../contexts/CarContext';

import ImageUpload from '../ImageUpload/ImageUpload';
import InputField from '../InputField/InputField';
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
  seats: 4,
  drive: 'FWD',
  images: []
}

const CarDialog = ({ open, onClose, car = null }) => {
  const [formData, setFormData] = useState(INITIAL_VALUES);

  const { translation } = useLanguage();
  const { updateNotification, openNotification } = useNotification();
  const { updateCarList } = useCarContext();

  useEffect(() => {
    if (car) {
      setFormData(car);
    }
  }, [open]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/car/update/${car.id}`, formData);
      updateCarList(car.id, formData);
      updateNotification('updateCarSuccess', 'success');
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
                <InputField
                  labelKey={'carModel'}
                  name={'model'}
                  value={formData.model}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <InputField
                  labelKey={'carYear'}
                  name={'year'}
                  type={'number'}
                  value={formData.year}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder={new Date().getFullYear()}
                />
              </Grid>
              <Grid size={6}>
                <InputField
                  labelKey={'licensePlate'}
                  name={'license_plate'}
                  value={formData.license_plate}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={6}>
                <InputField 
                  labelKey={'dailyPrice'}
                  name={'daily_price'}
                  type={'number'}
                  value={formData.daily_price}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder='$0.00'
                />
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
                <InputField
                  labelKey={'seats'}
                  name={'seats'}
                  type={'number'}
                  value={formData.seats}
                  onChange={handleChange}
                  required
                  fullWidth
                  placeholder={4}
                />
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
        <Button onClick={car ? handleUpdate : handleSubmit} variant="contained" color="primary">
          {car ? translation('update') : translation('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CarDialog;