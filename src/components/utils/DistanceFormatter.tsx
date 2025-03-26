import React from 'react';
import { useUnitContext } from '../../useUnitContext';
import { Spin } from 'antd';

interface DistanceFormatterProps {
  value: number;
  precision?: number;
  showUnit?: boolean;
}

const DistanceFormatter: React.FC<DistanceFormatterProps> = ({ 
  value, 
  precision = 2,
  showUnit = true 
}) => {
  const { distanceUnit, convertDistance, isLoading } = useUnitContext();
  
  if (isLoading) {
    return <Spin size="small" />;
  }
  
  const convertedValue = convertDistance(value);
  const formattedValue = convertedValue.toFixed(precision);
  
  if (showUnit) {
    return <>{formattedValue} {distanceUnit}</>;
  }
  
  return <>{formattedValue}</>;
};

export default DistanceFormatter;
