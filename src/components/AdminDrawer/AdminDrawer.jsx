import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  useTheme
} from '@mui/material';
import {
  Dashboard,
  DirectionsCar,
  Assignment,
  Logout,
  ChevronRight,
  Close
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const AdminDrawer = ({ open, onToggle, onSectionChange, activeSection }) => {
  const theme = useTheme();
  const { translation } = useLanguage();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      name: translation('dashboardTitle'),
      icon: <Dashboard />,
      section: 'dashboard',
    },
    {
      id: 2,
      name: translation('carManagementTitle'),
      icon: <DirectionsCar />,
      section: 'cars',
    },
    {
      id: 3,
      name: translation('rentalLogTitle'),
      icon: <Assignment />,
      section: 'rentals',
    },
  ];

  // Item separado para Logout
  const logoutItem = {
    name: translation('logout'),
    icon: <Logout />,
    onClick: () => navigate('/'),
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
          overflow: 'hidden'
        },
      }}
    >

      <Box sx={{
        display: 'flex',
        justifyContent: open ? 'flex-end' : 'center',
        mt: 1
      }}>
        <IconButton onClick={onToggle}>
          {open ? <Close /> : <ChevronRight />}
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.section}
            disablePadding
            sx={{
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
                  sx={{
                    opacity: open ? 1 : 0,
                    whiteSpace: 'nowrap'
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'flex-end',
      }}>
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