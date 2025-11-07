import { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Chip,
  useTheme
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCarContext } from '../../contexts/CarContext';

import dayjs from 'dayjs';

const RentalLog = () => {
  const [filterAvailability, setFilterAvailability] = useState('All');

  const theme = useTheme();
  const { translation } = useLanguage();
  const { rentals } = useCarContext();

  const filteredRentals = rentals.filter(rental => {
    const availabilityMatch =
      filterAvailability === 'All' ||
      (filterAvailability === 'Active' && rental.status === 'Active') ||
      (filterAvailability === 'Completed' && rental.status === 'Completed');
    return availabilityMatch;
  });

  const columns = [
    { 
      field: 'model', 
      headerName: translation('car'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.7 
    },
    {
      field: 'license_plate',
      headerName: translation('licensePlate'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.5,
    },
    { 
      field: 'customerName',
      headerName: translation('customer'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.7 
    },
    { 
      field: 'totalDays',
      headerName: translation('days'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.3,
    },
    { 
      field: 'startDate',
      headerName: translation('pickup'), 
      headerAlign: 'center',
      align: 'center',
      flex: 0.5, 
      renderCell: (params) => dayjs(params.value).format('DD/MM/YYYY')
    },
    { 
      field: 'endDate',
      headerName: translation('return'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.5,
      renderCell: (params) => dayjs(params.value).format('DD/MM/YYYY')
    },
    {
      field: 'totalAmount',
      headerName: translation('totalPrice'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.5,
      renderCell: (params) => `$${params.value}`
    },
    {
      field: 'status',
      headerName: translation('status'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.5,
      renderCell: (params) => (
        <Chip
          label={params.value === 'Active' ? translation('active') : translation('completed')}
          sx={{
            bgcolor: params.value === 'Active' ? theme.palette.warning.light : theme.palette.success.light,
            color: params.value === 'Active' ? theme.palette.warning.dark : theme.palette.success.dark,
            fontWeight: 'bold',
          }}
          size="small"
        />
      )
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        {translation('rentalLogTitle')}
      </Typography>
      <TextField
        select
        label={translation('filterAvailability')}
        value={filterAvailability}
        onChange={(e) => setFilterAvailability(e.target.value)}
        sx={{ minWidth: 200, mb: 3}}
      >
        <MenuItem value="All">{translation('all')}</MenuItem>
        <MenuItem value="Active">{translation('active')}</MenuItem>
        <MenuItem value="Completed">{translation('completed')}</MenuItem>
      </TextField>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '70vh',
      }}>
        <DataGrid
          rows={filteredRentals}
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