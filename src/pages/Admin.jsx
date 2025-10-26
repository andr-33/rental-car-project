import { useState } from "react";
import { Box } from "@mui/material";

import { CarProvider } from "../contexts/CarContext";

import AdminDrawer from "../components/AdminDrawer/AdminDrawer";
import Dashboard from "../components/Dashboard/Dashboard";
import CarManagement from "../components/CarManagement/CarManagement";
import RentalLog from "../components/RentalLog/RentalLog";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(true);

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
    </>
  );
};

export default () => (
  <CarProvider>
    <Admin />
  </CarProvider>
);