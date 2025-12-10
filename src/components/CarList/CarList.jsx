import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Skeleton,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";

import CarCard from "../CarCard/CarCard";
import axios from "axios";

const CarList = ({ rentalDays, translation, showCars }) => {
  const [loading, setLoading] = useState(false);
  const [carsData, setCarsData] = useState([]);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { updateNotification, openNotification } = useNotification();

  const handleAllowRenting = () => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  };

  useEffect(() => {
    if (!showCars) return;

    setLoading(true);

    const fetchCarsData = async () => {
      try {
        const carsData = await axios.get("/api/car/all-cars");
        setCarsData(carsData.data);
      } catch (error) {
        console.error(error.response.data.error.message);
        updateNotification(error.response.data.error.code, "error");
        openNotification();
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((item) => (
              <Grid size={{ xs: 12, md: 6 }} key={item}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2, mb: 1 }} />
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && (
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
