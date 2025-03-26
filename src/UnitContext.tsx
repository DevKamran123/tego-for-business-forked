import React, { useState, useEffect } from 'react';
import { DistanceUnit } from './UnitContextTypes';
import { UnitContext } from './UnitContext';

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(() => {
    // Load from localStorage if available, default to 'km'
    const savedUnit = localStorage.getItem('distanceUnit');
    return (savedUnit as DistanceUnit) || 'km';
  });
  // We're not actively using setIsLoading in this component, so suppress the warning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Save preference to localStorage when it changes
    localStorage.setItem('distanceUnit', distanceUnit);
  }, [distanceUnit]);

  // Convert distance based on selected unit
  const convertDistance = (value: number): number => {
    if (distanceUnit === 'mi') {
      // Convert km to miles
      return value * 0.621371;
    }
    return value; // Already in km
  };

  // Format distance with unit
  const formatDistance = (value: number): string => {
    const converted = convertDistance(value);
    return `${converted.toFixed(2)} ${distanceUnit}`;
  };

  const value = {
    distanceUnit,
    setDistanceUnit,
    convertDistance,
    formatDistance,
    isLoading,
  };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};
