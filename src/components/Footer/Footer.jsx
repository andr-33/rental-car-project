import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';

import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { translation } = useLanguage();
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'text.primary',
        color: 'background.paper',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="inherit" gutterBottom>
              {translation('aboutUs')}
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ opacity: 0.7, maxWidth: '300px' }}>
              We provide the best car rental service with a wide range of vehicles to suit your needs. Experience comfort and reliability with us.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="inherit" gutterBottom>
              {translation('contactUs')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOn sx={{ mr: 1, opacity: 0.7 }} fontSize="small" />
              <Typography variant="body2" color="inherit" sx={{ opacity: 0.7 }}>
                123 Rental Street, City, Country
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1, opacity: 0.7 }} fontSize="small" />
              <Typography variant="body2" color="inherit" sx={{ opacity: 0.7 }}>
                +1 234 567 890
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Email sx={{ mr: 1, opacity: 0.7 }} fontSize="small" />
              <Typography variant="body2" color="inherit" sx={{ opacity: 0.7 }}>
                info@carrental.com
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="h6" color="inherit" gutterBottom>
              {translation('followUs')}
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Box mt={5}>
        <Typography variant="body2" color="inherit" align="center" sx={{ opacity: 0.5 }}>
          {'© '}
          {new Date().getFullYear()}
          {` JR Drive. ${translation('allRightsReserved')}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
