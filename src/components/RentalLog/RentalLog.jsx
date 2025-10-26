import { 
  Typography, 
  Box, 
  Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCarContext } from '../../contexts/CarContext';

const RentalLog = () => {
  const { translation } = useLanguage();
  const { rentals } = useCarContext();

  const columns = [
    { field: 'id', headerName: translation('rentalLog.id'), width: 70 },
    { field: 'carInfo', headerName: translation('rentalLog.car'), width: 250 },
    { field: 'customerName', headerName: translation('rentalLog.customer'), width: 180 },
    { field: 'startDate', headerName: translation('rentalLog.startDate'), width: 130 },
    { field: 'endDate', headerName: translation('rentalLog.endDate'), width: 130 },
    { field: 'totalDays', headerName: translation('rentalLog.days'), width: 80 },
    {
      field: 'totalAmount',
      headerName: translation('rentalLog.amount'),
      width: 120,
      renderCell: (params) => `$${params.value}`
    },
    {
      field: 'status',
      headerName: translation('rentalLog.status'),
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value === 'Active' ? translation('rentalLog.active') : translation('rentalLog.completed')}
          color={params.value === 'Active' ? 'success' : 'default'}
          size="small"
        />
      )
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        {translation('rentalLog.title')}
      </Typography>
      
      <Box sx={{ height: 600, width: '100%', backgroundColor: 'white', borderRadius: 2 }}>
        <DataGrid
          rows={rentals}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default RentalLog;