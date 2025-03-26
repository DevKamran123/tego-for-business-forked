import React, { useState, useEffect } from 'react';
import { DistanceUnit } from './UnitContextTypes';
import { UnitContext } from './UnitContext';
import { getDefaultUnit } from './utils/locationUtils';


export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to 'km' initially, will be updated after location check
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [isLoading, setIsLoading] = useState(true);

  // Effect to determine the initial unit based on location or saved preference
  useEffect(() => {
    const initializeUnit = async () => {
      try {
        const defaultUnit = await getDefaultUnit();
        setDistanceUnit(defaultUnit);
      } catch (error) {
        console.error('Error setting default unit:', error);
        // Fallback to 'km' if there's an error
      } finally {
        setIsLoading(false);
      }
    };

    initializeUnit();
  }, []);

  // Effect to save preference to localStorage when it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('distanceUnit', distanceUnit);
    }
  }, [distanceUnit, isLoading]);

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
