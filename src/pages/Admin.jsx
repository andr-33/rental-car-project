import { useState } from "react";
import { Box } from "@mui/material";

import { CarProvider } from "../contexts/CarContext";
import { NotificationProvider, useNotification } from "../contexts/NotificationContext";

import AdminDrawer from "../components/AdminDrawer/AdminDrawer";
import Dashboard from "../components/Dashboard/Dashboard";
import CarManagement from "../components/CarManagement/CarManagement";
import RentalLog from "../components/RentalLog/RentalLog";
import Notification from "../components/Notification/Notification";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("cars");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const { notification, closeNotification } = useNotification();

  const sectionComponents = {
    dashboard: <Dashboard />,
    cars: <CarManagement />,
    rentals: <RentalLog />,
  };

  return (
    <>
      <AdminDrawer
        open={drawerOpen}
        onToggle={() => setDrawerOpen(!drawerOpen)}
        onSectionChange={setActiveSection}
        activeSection={activeSection}
      />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 3,
          ml: drawerOpen ? "240px" : "55px",
          transition: "margin-left 0.3s ease",
        }}
      >
        {sectionComponents[activeSection] || <Dashboard />}
      </Box>
      <Notification
        notification={notification}
        closeNotification={closeNotification}
      />
    </>
  );
};

export default () => (
  <NotificationProvider>
    <CarProvider>
      <Admin />
    </CarProvider>
  </NotificationProvider>
);