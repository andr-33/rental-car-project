import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Toolbar,
  Box,
} from '@mui/material';
import {
  Dashboard,
  DirectionsCar,
  Assignment,
  People,
  Person,
  Logout,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';

const drawerWidth = 240; // Ancho estándar para drawer expandido

const AdminDrawer = ({ open, onToggle, onSectionChange, activeSection }) => {
  const theme = useTheme();
  const { translation } = useLanguage();

  // Definimos los items del menú adaptados al contexto de renta de coches para Admin
  const menuItems = [
    {
      id: 1,
      name: translation('dashboard'),
      icon: <Dashboard />,
      section: 'dashboard',
    },
    {
      id: 2,
      name: translation('manageVehicles'),
      icon: <DirectionsCar />,
      section: 'cars',
    },
    {
      id: 3,
      name: translation('manageRentals'),
      icon: <Assignment />,
      section: 'rentals',
    },
    {
      id: 4,
      name: translation('manageUsers'),
      icon: <People />,
      section: 'users',
    },
    {
      id: 5,
      name: translation('myProfile'),
      icon: <Person />,
      section: 'profile',
    },
  ];

  // Item separado para Logout
  const logoutItem = {
    name: translation('logout'),
    icon: <Logout />,
    onClick: () => {
      // Aquí puedes agregar lógica de logout, como limpiar auth
      // Por ejemplo, podrías redirigir o disparar un evento
      console.log('Logout clicked');
    },
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : theme.spacing(7),
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : theme.spacing(7),
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Toolbar /> {/* Espacio para el AppBar superior */}

      {/* Botón para toggle del drawer */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onToggle}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.section}
            disablePadding
            sx={{
              // Estilo para resaltar la sección activa
              backgroundColor:
                activeSection === item.section
                  ? theme.palette.action.selected
                  : 'inherit',
            }}
          >
            <ListItemButton
              onClick={() => onSectionChange(item.section)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Sección inferior para Logout */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={logoutItem.onClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {logoutItem.icon}
            </ListItemIcon>
            {open && (
              <ListItemText
                primary={logoutItem.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminDrawer;