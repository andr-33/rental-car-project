import { Grid, Typography, Box } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  DirectionsCar as CarIcon,
  Receipt as ReceiptIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import StatCard from '../StatCard/StatCard.jsx';
import { getMonthlyStats } from '../../data/mockData.js';

const Dashboard = ()=> {
  const { translation } = useLanguage();
  const stats = getMonthlyStats();

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        {translation('dashboardTitle')}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={translation('dashboard.totalRentals')}
            value={stats.totalRentals}
            icon={<ReceiptIcon sx={{ fontSize: 32, color: 'primary.main' }} />}
            color="primary"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={translation('dashboard.monthlyRevenue')}
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<TrendingUpIcon sx={{ fontSize: 32, color: 'success.main' }} />}
            color="success"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={translation('dashboard.activeRentals')}
            value={stats.activeRentals}
            icon={<CheckCircleIcon sx={{ fontSize: 32, color: 'warning.main' }} />}
            color="warning"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={translation('dashboard.availableCars')}
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