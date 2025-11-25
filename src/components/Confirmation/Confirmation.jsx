import {
  Button,
  Box,
  Typography,
} from "@mui/material";

import { useLanguage } from "../../contexts/LanguageContext";

const Confirmation = () => {
  const { translation } = useLanguage();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box sx={{
        textAlign: 'center',
        maxWidth: '450px'
      }}>
        <Typography variant="h1">📦</Typography>
        <Typography variant="h5">{translation("reservationRequested")}</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {translation("reservationConfirmationMessage")}
        </Typography>
      </Box>
    </Box>
  );
};

export default Confirmation;