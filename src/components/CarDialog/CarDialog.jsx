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
import ImageUpload from '../ImageUpload/ImageUpload';

const CarDialog = ({ open, onClose, onSave, car = null }) => {
  const { translation } = useLanguage();
  const [formData, setFormData] = useState({
    model: '',
    year: '',
    licensePlate: '',
    dailyRate: '',
    available: true,
    image: ''
  });

  console.log(formData);

  useEffect(() => {
    if (car) {
      setFormData(car);
    } else {
      setFormData({
        model: '',
        year: '',
        licensePlate: '',
        dailyRate: '',
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


  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <DialogTitle>{car ? translation('editCar') : translation('addCar')}</DialogTitle>
        <IconButton
          size="small"
          onClick={handleToggleAvailability}
          sx={{
            pr: 3
          }}
        >
          {formData.available ?
            <ToggleOnIcon fontSize='large' color='success' /> :
            <ToggleOffIcon fontSize='large' />
          }
        </IconButton>
      </Stack>
      <DialogContent sx={{ pt: 0 }}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={7}>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, sm: 6 }}>
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
              <Grid size={{ xs: 12, sm: 6 }}>
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
              <Grid size={{ xs: 12, sm: 6 }}>
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
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <FormLabel
                    required
                    sx={{
                      fontSize: '16px'
                    }}
                  >
                    {translation('dailyRate')}
                  </FormLabel>
                  <TextField
                    fullWidth
                    name="dailyRate"
                    type="number"
                    value={formData.dailyRate}
                    placeholder='$0.00'
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={5}>
            <ImageUpload
              value={formData.image}
              onChange={handleImageChange}
            />
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