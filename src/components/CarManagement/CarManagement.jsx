import { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Stack
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
    { field: 'id', headerName: translation('id'), width: 70 },
    { field: 'model', headerName: translation('carModel'), width: 200 },
    { field: 'year', headerName: translation('carYear'), width: 90 },
    { field: 'licensePlate', headerName: translation('licensePlate'), width: 130 },
    {
      field: 'dailyRate',
      headerName: translation('dailyRate'),
      width: 130,
      renderCell: (params) => `$${params.value}`
    },
    {
      field: 'available',
      headerName: translation('status'),
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value ? translation('available') : translation('notAvailable')}
          color={params.value ? 'success' : 'error'}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      headerName: translation('actions'),
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleToggleAvailability(params.row.id)}
            title={translation('toggleAvailability')}
          >
            {params.row.available ? <ToggleOnIcon /> : <ToggleOffIcon />}
          </IconButton>
          <IconButton
            size="small"
            color="info"
            onClick={() => handleEditCar(params.row)}
            title={translation('edit')}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteClick(params.row)}
            title={translation('delete')}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {translation('carManagementTitle')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCar}
          size="large"
        >
          {translation('addCar')}
        </Button>
      </Box>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
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
      </Stack>

      <Box sx={{ height: 600, width: '100%', backgroundColor: 'white', borderRadius: 2 }}>
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
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
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