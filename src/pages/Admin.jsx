import { Box } from "@mui/material";
import { useState } from "react";

import AdminDrawer from "../components/AdminDrawer/AdminDrawer";
import Dashboard from "../components/Dashboard/Dashboard";
// Asumiendo que tienes componentes para las otras secciones; si no, impórtalos o créalos
// Por ejemplo:
// import CarManagement from "./CarManagement";
// import RentalManagement from "./RentalManagement";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(true);

  const sectionComponents = {
    dashboard: <Dashboard />,
    // cars: <CarManagement />,
    // rentals: <RentalManagement />,
    // ... otras secciones
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
          bgcolor: "red", // Mantengo esto para debug; quítalo cuando no sea necesario
          transition: "margin-left 0.3s ease",
        }}
      >
        {sectionComponents[activeSection] || <Dashboard />}
      </Box>
    </>
  );
};

export default Admin;