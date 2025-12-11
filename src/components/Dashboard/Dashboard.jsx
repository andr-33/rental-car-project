import { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Box
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  DirectionsCar as CarIcon,
  Receipt as ReceiptIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import StatCard from '../StatCard/StatCard.jsx';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';
import axios from 'axios';

let cachedStats = null;

const Dashboard = () => {
  const [stats, setStats] = useState(cachedStats || {});
  const { language, translation } = useLanguage();
  dayjs.locale(language);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const currentMonthYear = capitalizeFirstLetter(dayjs().format('MMMM YYYY'));

  useEffect(() => {
    if (cachedStats) {
      setStats(cachedStats);
      return;
    }

    const fetchMonthlyStats = async () => {
      try {
        const response = await axios.get('/api/stats/monthly');
        setStats(response.data);
        cachedStats = response.data;
      } catch (error) {
        console.error('Error fetching monthly stats:', error);
      }
    };
    fetchMonthlyStats();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        {translation('dashboardTitle')} - {currentMonthYear}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title={translation('totalRentals')}
            value={stats.total_rentals}
            icon={<ReceiptIcon sx={{ fontSize: 32, color: 'primary.main' }} />}
            color="primary"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title={translation('monthlyRevenue')}
            value={`$${stats.monthly_income?.toLocaleString()}`}
            icon={<TrendingUpIcon sx={{ fontSize: 32, color: 'success.main' }} />}
            color="success"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title={translation('activeRentals')}
            value={stats.active_rentals}
            icon={<CheckCircleIcon sx={{ fontSize: 32, color: 'warning.main' }} />}
            color="warning"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title={translation('availableCars')}
            value={`${stats.available_cars}/${stats.total_cars}`}
            icon={<CarIcon sx={{ fontSize: 32, color: 'info.main' }} />}
            color="info"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;