import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  useTheme
} from '@mui/material';

const StatCard = ({ title, value, icon, color }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        border: '1px solid #ccc',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography 
              color="text.secondary" 
              gutterBottom 
              variant="body1"
            >
              {title}
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                ml: 1, 
                fontWeight: 700, 
                color: `${color}.main` 
              }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}.light`,
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Box>
  );
};

export default StatCard;