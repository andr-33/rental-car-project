import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import {
  Instagram,
  YouTube,
  X,
  Language,
} from '@mui/icons-material';

import { useLanguage } from '../../contexts/LanguageContext';

const HomeAppBar = () => {
  const { language, toggleLanguage, translation } = useLanguage();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {translation('title')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube />
          </IconButton>
          <IconButton
            color="inherit"
            component="a"
            href="https://www.x.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X />
          </IconButton>
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          color="inherit"
          startIcon={<Language />}
          onClick={toggleLanguage}
        >
          {language === 'es' ? 'EN' : 'ES'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HomeAppBar;