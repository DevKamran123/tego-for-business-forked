import { useContext } from 'react';
import { UnitContext } from './UnitContext.ts';
import { UnitContextType } from './UnitContextTypes';

// Custom hook to use the unit context
export const useUnitContext = (): UnitContextType => {
  const context = useContext(UnitContext);
  if (context === undefined) {
    throw new Error('useUnitContext must be used within a UnitProvider');
  }
  return context;
};
