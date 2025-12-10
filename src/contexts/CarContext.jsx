import { createContext, useContext, useState } from 'react';

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

  const addCar = (newCar) => {
    setCars([...cars, newCar]);
  };

  const updateCarList = (id, updatedCar) => {
    setCars(cars.map(car => car.id === id ? { ...car, ...updatedCar } : car));
  };

  const deleteCar = (id) => {
    setCars(cars.filter(car => car.id !== id));
  };

  const toggleStatus = (id) => {
    setCars(cars.map(car =>
      car.id === id ? { ...car, available: !car.available } : car
    ));
  };

  const monthlyStats = () => {
    const availableCars = cars.filter(car => car.available).length;
    return {
      totalCars: cars.length,
      availableCars,
    };
  };

  return (
    <CarContext.Provider value={{
      cars,
      setCars,
      addCar,
      updateCarList,
      deleteCar,
      toggleStatus,
      monthlyStats
    }}>
      {children}
    </CarContext.Provider>
  );
};