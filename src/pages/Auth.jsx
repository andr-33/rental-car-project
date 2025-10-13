import {
  Box,
  useTheme
} from "@mui/material";

import { NotificationProvider, useNotification } from "../contexts/NotificationContext";

import HomeAppBar from "../components/HomeAppBar/HomeAppBar";
import LoginForm from "../components/LoginForm/LoginForm";
import Notification from "../components/Notification/Notification";

const Auth = () => {
  const theme = useTheme();
  const { notification, closeNotification } = useNotification();

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}>
      <HomeAppBar />
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      }}>
        <Box
          sx={{
            borderRadius: 4,
            border: '1px solid #ccc',
            boxShadow: 6,
            px: 2,
            py: 4,
            bgcolor: theme.palette.background.paper,
            width: {xs: "325px", md: "450px"},
            margin: "0 auto",
          }}
        >
          <LoginForm />
        </Box>
      </Box>
      <Notification 
        notification={notification} 
        closeNotification={closeNotification}
      />
    </Box>
  );
};

export default () => (
  <NotificationProvider>
    <Auth />
  </NotificationProvider>
);