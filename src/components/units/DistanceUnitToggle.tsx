import React from 'react';
import { useUnitContext } from '../../useUnitContext';
import { Switch, Spin } from 'antd';
import { MdSpeed } from 'react-icons/md';
import '../../styles/components/DistanceUnitToggle.scss';

interface DistanceUnitToggleProps {
  className?: string;
  sideBarOpen: boolean;
}

const DistanceUnitToggle: React.FC<DistanceUnitToggleProps> = ({ className = '', sideBarOpen }) => {
  const { distanceUnit, setDistanceUnit, isLoading } = useUnitContext();

  const handleToggleChange = (checked: boolean) => {
    setDistanceUnit(checked ? 'mi' : 'km');
  };

  if (isLoading) {
    return (
      <div className={`distance-unit-toggle ${className}`}>
        <Spin size="small" />
      </div>
    );
  }

  if (sideBarOpen) return (
    <div className={`distance-unit-toggle ${className}`}>
      <MdSpeed className="unit-icon" />
      <span className="unit-label">KM</span>
      <Switch 
        size="small" 
        checked={distanceUnit === 'mi'} 
        onChange={handleToggleChange} 
      />
      <span className="unit-label">MI</span>
    </div>

  );

  else return (
    <div className={`distance-unit-toggle ${className}`}>
      <Switch 
        size="small" 
        checked={distanceUnit === 'mi'} 
        onChange={handleToggleChange} 
      />
    </div>

  );
};

export default DistanceUnitToggle;
