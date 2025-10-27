import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useLanguage } from '../../contexts/LanguageContext';
import ImageUpload from '../ImageUpload/ImageUpload';

const CarDialog = ({ open, onClose, onSave, car = null }) => {
  const { translation } = useLanguage();
  const [formData, setFormData] = useState({
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    dailyRate: '',
    available: true,
    image: ''
  });

  useEffect(() => {
    if (car) {
      setFormData(car);
    } else {
      setFormData({
        model: '',
        year: new Date().getFullYear(),
        licensePlate: '',
        dailyRate: '',
        available: true,
        image: ''
      });
    }
  }, [car, open]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'available' ? checked : value
    }));
  };

  const handleImageChange = (imageUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {car ? translation('editCar') : translation('addCar')}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={translation('carModel')}
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translation('carYear')}
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translation('licensePlate')}
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={translation('pricePerDay')}
              name="dailyRate"
              type="number"
              value={formData.dailyRate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.available}
                  onChange={handleChange}
                  name="available"
                  color="primary"
                />
              }
              label={translation('available')}
            />
          </Grid>
          <Grid item xs={12}>
            <ImageUpload
              value={formData.image}
              onChange={handleImageChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
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