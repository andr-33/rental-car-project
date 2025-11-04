export const mockRentals = [
  {
    id: 1,
    carId: 3,
    carInfo: 'Ford Mustang (DEF-9012)',
    customerName: 'John Smith',
    startDate: '2025-10-15',
    endDate: '2025-10-20',
    totalDays: 5,
    totalAmount: 425,
    status: 'Active'
  },
  {
    id: 2,
    carId: 6,
    carInfo: 'Mercedes C-Class (MNO-2345)',
    customerName: 'Sarah Johnson',
    startDate: '2025-10-18',
    endDate: '2025-10-22',
    totalDays: 4,
    totalAmount: 320,
    status: 'Active'
  },
  {
    id: 3,
    carId: 1,
    carInfo: 'Toyota Camry (ABC-1234)',
    customerName: 'Michael Brown',
    startDate: '2025-10-01',
    endDate: '2025-10-05',
    totalDays: 4,
    totalAmount: 180,
    status: 'Completed'
  },
  {
    id: 4,
    carId: 2,
    carInfo: 'Honda CR-V (XYZ-5678)',
    customerName: 'Emily Davis',
    startDate: '2025-10-08',
    endDate: '2025-10-12',
    totalDays: 4,
    totalAmount: 220,
    status: 'Completed'
  },
  {
    id: 5,
    carId: 4,
    carInfo: 'Tesla Model 3 (GHI-3456)',
    customerName: 'David Wilson',
    startDate: '2025-10-10',
    endDate: '2025-10-15',
    totalDays: 5,
    totalAmount: 475,
    status: 'Completed'
  },
  {
    id: 6,
    carId: 5,
    carInfo: 'BMW X5 (JKL-7890)',
    customerName: 'Lisa Anderson',
    startDate: '2025-10-12',
    endDate: '2025-10-17',
    totalDays: 5,
    totalAmount: 375,
    status: 'Completed'
  }
];

// Calculate monthly statistics
export const getMonthlyStats = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyRentals = mockRentals.filter(rental => {
    const rentalDate = new Date(rental.startDate);
    return rentalDate.getMonth() === currentMonth && rentalDate.getFullYear() === currentYear;
  });

  const totalRevenue = monthlyRentals.reduce((sum, rental) => sum + rental.totalAmount, 0);
  const activeRentals = mockRentals.filter(r => r.status === 'Active').length;
  const availableCars = mockCars.filter(car => car.available).length;

  return {
    totalRentals: monthlyRentals.length,
    totalRevenue,
    activeRentals,
    availableCars,
    totalCars: mockCars.length
  };
};