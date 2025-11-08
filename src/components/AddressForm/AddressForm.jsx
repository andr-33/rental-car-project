import { useEffect, useState } from "react";
import {
  Box,
  Grid,
} from "@mui/material";

import { useAuth } from "../../contexts/AuthContext";

import InputField from "../InputField/InputField";

import axios from "axios";

const INITIAL_VALUES = {
  full_name: "",
  address: "",
  country: "",
  city: "",
  zip_code: "",
  passport: "",
  phone: "",
};

const AddressForm = () => {
  const [formData, setFormData] = useState(INITIAL_VALUES);
  const [loading, setLoading] = useState(false);
  console.log("Address Form: ",formData);

  const { sessionToken } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try { 
        const response = await axios.get('/api/user/auth', {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        console.log("User data: ", response.data);
        setFormData(prev => ({ ...prev, ...response.data }));
      } catch (error) {
        console.error(error.response.data.error.message);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Box component="form">
      <Grid container spacing={2}>
        <Grid size={12}>
          <InputField 
            labelKey={'fullName'}
            name={'full_name'}
            value={formData.full_name}
            disabled
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <InputField 
            labelKey={'address'}
            name={'address'}
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'country'}
            name={'country'}
            value={formData.country}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'city'}
            name={'city'}
            value={formData.city}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'zip_code'}
            name={'zip_code'}
            value={formData.zip_code}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'phone'}
            name={'phone'}
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm;