import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import CarCard from "../CarCard/CarCard";
import { cars as localCars } from "../../data/carsData";

const CarList = ({ rentalDays, translation, showCars }) => {
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!showCars) return;

    setLoading(true);
    setError(null);

    // Simulación de llamada a API con setTimeout
    const fetchCars = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // simula delay 2s
        // Aquí en el futuro: const response = await fetch('/api/cars') ...
        setCarData(localCars); // de momento usamos mock local
      } catch (err) {
        setError("Error al cargar los autos 🚨");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [showCars]);

  if (!showCars) return null;

  return (
    <Box sx={{ my: 2, width: "100%", px: 2 }}>
      <Box>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 2 }}>
          {translation("availableCars")}
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Grid container spacing={2}>
            {carData.map((car) => (
              <Grid size={{ xs: 12, md: 6 }} key={car.id}>
                <CarCard car={car} rentalDays={rentalDays} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CarList;
