import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  useTheme
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNotification } from '../../contexts/NotificationContext';
import ChipSelector from './ChipSelector';

import dayjs from 'dayjs';
import axios from 'axios';

const RentalLog = () => {
  const [rentals, setRentals] = useState([]);
  const [filterAvailability, setFilterAvailability] = useState('All');

  const theme = useTheme();
  const { translation } = useLanguage();
  const { updateNotification, openNotification } = useNotification();
  const filteredRentals = rentals.filter(rental => {
    const availabilityMatch =
      filterAvailability === 'All' ||
      (filterAvailability === 'Solicited' && rental.status === 'solicited') ||
      (filterAvailability === 'Active' && rental.status === 'active') ||
      (filterAvailability === 'Completed' && rental.status === 'completed');
    return availabilityMatch;
  });

  const getChipProps = (status) => {
    switch (status) {
      case 'solicited':
        return {
          label: translation('solicited'),
          color: 'warning',
        };
      case 'active':
        return {
          label: translation('active'),
          color: 'success',
        };
      case 'completed':
        return {
          label: translation('completed'),
          color: 'info',
        };
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    const previousRentals = [...rentals];
    const updatedRentals = rentals.map(rental =>
      rental.id === id ? { ...rental, status: newStatus } : rental
    );
    setRentals(updatedRentals);

    try {
      await axios.put(`/api/rental/update-status/${id}`, { newStatus });
    } catch (error) {
      console.error(error.response?.data?.error?.message || 'Error updating status');
      updateNotification(error.response?.data?.error?.code, 'error');
      openNotification();
      setRentals(previousRentals);
    }
  };

  const columns = [
    {
      field: 'model',
      headerName: translation('car'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.7,
    },
    {
      field: 'license_plate',
      headerName: translation('licensePlate'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.5,
    },
    {
      field: 'customer',
      headerName: translation('customer'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.7
    },
    {
      field: 'rental_days',
      headerName: translation('days').charAt(0).toUpperCase() + translation('days').slice(1),
      headerAlign: 'center',
      align: 'center',
      flex: 0.3,
    },
    {
      field: 'pickup_date',
      headerName: translation('pickup'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.5,
      renderCell: (params) => dayjs(params.value).format('DD/MM/YYYY')
    },
    {
      field: 'return_date',
      headerName: translation('return'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.5,
      renderCell: (params) => dayjs(params.value).format('DD/MM/YYYY')
    },
    {
      field: 'total_amount',
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
      flex: 0.8,
      editable: true,
      renderCell: (params) => (
        <ChipSelector
          value={params.value}
          onChange={(e) => handleUpdateStatus(params.id, e.target.value)}
          options={['active', 'completed', 'solicited']}
          getOptionProps={getChipProps}
        />
      )
    }
  ];

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const rentalsData = await axios.get('/api/rental/all-rentals');
        const rentals = rentalsData.data.map(rental => ({
          ...rental,
          model: rental.car_id.model,
          license_plate: rental.car_id.license_plate,
          customer: rental.user_id.full_name,
        }));
        setRentals(rentals);
      } catch (error) {
        console.error(error.response.data.error.message);
      }
    };
    fetchRentals();
  }, []);

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
        sx={{ minWidth: 200, mb: 3 }}
      >
        <MenuItem value="All">{translation('all')}</MenuItem>
        <MenuItem value="Solicited">{translation('solicited')}</MenuItem>
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