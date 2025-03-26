import { createContext } from 'react';
import { UnitContextType } from './UnitContextTypes';

// Just export the context, no component or hooks
export const UnitContext = createContext<UnitContextType | undefined>(undefined);
