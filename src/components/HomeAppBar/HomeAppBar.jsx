import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Divider,
  Box,
} from '@mui/material';
import {
  Language,
} from '@mui/icons-material';

import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomeAppBar = () => {
  const [allowAuthentication, setAllowAuthentication] = useState(true);
  const { language, toggleLanguage, translation } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      setAllowAuthentication(false);
    }
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'start' }}>
          <Box
            component={'img'}
            src={'/images/logo blanco.png'}
            alt="Logo"
            sx={{ width: '100px', height: 'auto' }}
            onClick={() => navigate('/')}
          />
        </Box>
        {allowAuthentication && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="outlined" color="inherit" onClick={() => navigate('/auth')}>
              {translation('login')}
            </Button>
            <Button variant="outlined" color="inherit" onClick={() => navigate('/register')}>
              {translation('signUp')}
            </Button>
          </Box>
        )}
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