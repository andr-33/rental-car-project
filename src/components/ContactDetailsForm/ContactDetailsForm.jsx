import { useEffect, useState } from "react";
import {
  Box,
  Grid,
} from "@mui/material";

import { useAuth } from "../../contexts/AuthContext";
import { useOverview } from "../../contexts/OverViewContext";

import InputField from "../InputField/InputField";

import axios from "axios";

const ContactDetailsForm = () => {
  const { sessionToken } = useAuth();
  const { contactDetails, setContactDetails } = useOverview();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails(prev => ({
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
        setContactDetails(prev => ({ ...prev, ...response.data }));
      } catch (error) {
        console.error(error.response.data.error.message);
      }
    };

    if(!contactDetails.full_name){
      fetchUserData();
    }
  }, []);

  return (
    <Box component="form">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'fullName'}
            name={'full_name'}
            value={contactDetails.full_name}
            disabled
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'passport'}
            name={'passport'}
            value={contactDetails.passport}
            disabled
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <InputField 
            labelKey={'address'}
            name={'address'}
            value={contactDetails.address}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'country'}
            name={'country'}
            value={contactDetails.country}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'city'}
            name={'city'}
            value={contactDetails.city}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'zipCode'}
            name={'zip_code'}
            value={contactDetails.zip_code}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <InputField 
            labelKey={'phone'}
            name={'phone'}
            value={contactDetails.phone}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactDetailsForm;