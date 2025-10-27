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
import { getMonthlyStats } from '../../data/mockData.js';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import 'dayjs/locale/en';

const Dashboard = ()=> {
  const { language, translation } = useLanguage();
  const stats = getMonthlyStats();
  dayjs.locale(language);

  const capitalizeFirstLetter = (string) => {  
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const currentMonthYear = capitalizeFirstLetter(dayjs().format('MMMM YYYY'));

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        {translation('dashboardTitle')} - {currentMonthYear}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title={translation('totalRentals')}
            value={stats.totalRentals}
            icon={<ReceiptIcon sx={{ fontSize: 32, color: 'primary.main' }} />}
            color="primary"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title={translation('monthlyRevenue')}
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<TrendingUpIcon sx={{ fontSize: 32, color: 'success.main' }} />}
            color="success"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title={translation('activeRentals')}
            value={stats.activeRentals}
            icon={<CheckCircleIcon sx={{ fontSize: 32, color: 'warning.main' }} />}
            color="warning"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <StatCard
            title={translation('availableCars')}
            value={`${stats.availableCars}/${stats.totalCars}`}
            icon={<CarIcon sx={{ fontSize: 32, color: 'info.main' }} />}
            color="info"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;