import { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Stack,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useLanguage } from '../../contexts/LanguageContext';
import { useCarContext } from '../../contexts/CarContext';
import CarDialog from '../../components/CarDialog/CarDialog';
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog/DeleteConfirmDialog';

const CarManagement = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [filterAvailability, setFilterAvailability] = useState('All');

  const theme = useTheme();
  const { translation } = useLanguage();
  const { cars, addCar, updateCar, deleteCar, toggleAvailability } = useCarContext();

  const handleAddCar = () => {
    setSelectedCar(null);
    setDialogOpen(true);
  };

  const handleEditCar = (car) => {
    setSelectedCar(car);
    setDialogOpen(true);
  };

  const handleSaveCar = (carData) => {
    if (selectedCar) {
      updateCar(selectedCar.id, carData);
    } else {
      addCar(carData);
    }
  };

  const handleDeleteClick = (car) => {
    setCarToDelete(car);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (carToDelete) {
      deleteCar(carToDelete.id);
      setDeleteDialogOpen(false);
      setCarToDelete(null);
    }
  };

  const handleToggleAvailability = (id) => {
    toggleAvailability(id);
  };

  const filteredCars = cars.filter(car => {
    const availabilityMatch =
      filterAvailability === 'All' ||
      (filterAvailability === 'Available' && car.available) ||
      (filterAvailability === 'Not Available' && !car.available);
    return availabilityMatch;
  });

  const columns = [
    { 
      field: 'id',
      headerName: translation('id'), 
      headerAlign: 'center',
      align: 'center', 
      flex: 0.2 
    },
    { 
      field: 'model', 
      headerName: translation('carModel'), 
      headerAlign: 'center',
      align: 'center', 
      flex: 1 
    },
    { 
      field: 'year', 
      headerName: translation('carYear'), 
      headerAlign: 'center',
      align: 'center', 
      flex: 0.45
     },
    { 
      field: 'licensePlate', 
      headerName: translation('licensePlate'), 
      headerAlign: 'center',
      align: 'center', 
      flex: 0.65, 
    },
    {
      field: 'dailyRate',
      headerName: translation('dailyRate'),
      headerAlign: 'center',
      align: 'center',
      width: 130,
      renderCell: (params) => `$${params.value}`
    },
    {
      field: 'available',
      headerName: translation('status'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.75,
      renderCell: (params) => (
        <Chip
          label={params.value ? translation('available') : translation('notAvailable')}
          sx={{
            bgcolor: params.value ? theme.palette.success.light : theme.palette.error.light,
            color: params.value ? theme.palette.success.dark : theme.palette.error.dark,
            fontWeight: 'bold',
          }}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      headerName: translation('actions'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => handleToggleAvailability(params.row.id)}
            title={translation('toggleAvailability')}
          >
            {params.row.available ?
              <ToggleOnIcon color='success' /> :
              <ToggleOffIcon />
            }
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleEditCar(params.row)}
            title={translation('edit')}
          >
            <EditIcon sx={{
              ":hover": {
                color: theme.palette.primary.main
              }
            }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDeleteClick(params.row)}
            title={translation('delete')}
          >
            <DeleteIcon sx={{
              ":hover": {
                color: theme.palette.error.main
              }
            }} />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        {translation('carManagementTitle')}
      </Typography>

      <Stack direction="row" justifyContent={'space-between'} sx={{ mb: 3 }}>
        <TextField
          select
          label={translation('filterAvailability')}
          value={filterAvailability}
          onChange={(e) => setFilterAvailability(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="All">{translation('all')}</MenuItem>
          <MenuItem value="Available">{translation('available')}</MenuItem>
          <MenuItem value="Not Available">{translation('notAvailable')}</MenuItem>
        </TextField>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCar}
          size="large"
        >
          {translation('addCar')}
        </Button>
      </Stack>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '70vh',
      }}>
        <DataGrid
          rows={filteredCars}
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
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }
          }}
        />
      </Box>

      <CarDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveCar}
        car={selectedCar}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        carInfo={carToDelete ? `${carToDelete.model} (${carToDelete.licensePlate})` : ''}
      />
    </Box>
  );
};

export default CarManagement;