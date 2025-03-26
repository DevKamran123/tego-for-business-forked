export type DistanceUnit = 'km' | 'mi';

export interface UnitContextType {
  distanceUnit: DistanceUnit;
  setDistanceUnit: (unit: DistanceUnit) => void;
  convertDistance: (value: number) => number;
  formatDistance: (value: number) => string;
  isLoading: boolean;
}
