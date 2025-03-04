import React from 'react';

interface ChevronProps {
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Chevron: React.FC<ChevronProps> = ({ isActive, className, onClick }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    <path
      d="M1 1.00003C1 1.00003 3.94596 4.99999 5.00003 5C6.05411 5.00001 9 1 9 1"
      stroke={isActive ? 'white' : '#202020'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

