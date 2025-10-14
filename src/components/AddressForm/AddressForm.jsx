import {
  Box,
  TextField,
  Grid,
  FormControl,
  FormLabel
} from "@mui/material";

import { useLanguage } from "../../contexts/LanguageContext";

const AddressForm = () => {

  const { translation } = useLanguage();

  return (
    <Box component="form">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={{fontSize: "1em"}}>{translation("firstName")}</FormLabel>
            <TextField
              name="firstName"
              type="text"
              required
              disabled
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={{fontSize: "1em"}}>{translation("lastName")}</FormLabel>
            <TextField
              name="lastName"
              type="text"
              required
              disabled
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <FormLabel sx={{fontSize: "1em"}}>{translation("address")}*</FormLabel>
            <TextField
              name="address"
              type="text"
              required
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={{fontSize: "1em"}}>{translation("country")}*</FormLabel>
            <TextField
              id="phone"
              autoComplete="tel"
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={{fontSize: "1em"}}>{translation("city")}*</FormLabel>
            <TextField
              id="phone"
              autoComplete="tel"
            />
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <FormLabel sx={{fontSize: "1em"}}>{translation("zipCode")}*</FormLabel>
            <TextField
              id="phone"
              autoComplete="tel"
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm;