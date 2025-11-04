import { createContext, useContext, useState } from 'react';
import { mockRentals } from '../data/mockData';

const CarContext = createContext();

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext must be used within CarProvider');
  }
  return context;
};

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [rentals] = useState(mockRentals);

  const addCar = (newCar) => {
    const car = {
      ...newCar,
      id: Math.max(...cars.map(c => c.id)) + 1
    };
    setCars([...cars, car]);
  };

  const updateCarList = (id, updatedCar) => {
    setCars(cars.map(car => car.id === id ? { ...car, ...updatedCar } : car));
  };

  const deleteCar = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const toggleAvailability = (id) => {
    setCars(cars.map(car => 
      car.id === id ? { ...car, available: !car.available } : car
    ));
  };

  return (
    <CarContext.Provider value={{
      cars,
      setCars,
      rentals,
      addCar,
      updateCarList,
      deleteCar,
      toggleAvailability
    }}>
      {children}
    </CarContext.Provider>
  );
};