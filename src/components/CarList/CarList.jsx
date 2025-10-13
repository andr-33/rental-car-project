import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; 

import CarCard from "../CarCard/CarCard";
import axios from "axios";

const CarList = ({ rentalDays, translation, showCars }) => {
  const [loading, setLoading] = useState(false);
  const [carsData, setCarsData] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAllowRenting = () => {
    if(!isAuthenticated){
      navigate("/auth");
    }
  };

  useEffect(() => {
    if (!showCars) return;

    setLoading(true);
    setError(null);

    const fetchCarsData = async () => {
      try {
        const carsData = await axios.get("/api/car/all-cars");
        setCarsData(carsData.data);
      } catch (error) {
        console.error(error.response.data.error.message);
        
        setError("Error al cargar los autos 🚨");
      } finally {
        setLoading(false);
      }
    };
    fetchCarsData();
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
            {carsData?.map((car) => (
              <Grid size={{ xs: 12, md: 6 }} key={car.id}>
                <CarCard 
                  handleAllowRenting={handleAllowRenting}
                  car={car} 
                  rentalDays={rentalDays} 
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CarList;
