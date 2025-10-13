import {
  Alert,
  Snackbar,
  Grow
} from "@mui/material";

import { useLanguage } from "../../contexts/LanguageContext";

const GrowTransition = (props) => {
  return <Grow {...props} />;
};


const Notification = ({ notification, closeNotification }) => {
  const { translation } = useLanguage();

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={6000}
      onClose={closeNotification}
      slots={{
        transition: GrowTransition,
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        severity={notification.type}
        variant="outlined"
        sx={{ width: "100%"}}
      >
        {translation(notification.code)}
      </Alert>
    </Snackbar>
  );
};

export default Notification;