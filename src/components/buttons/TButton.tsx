import React from "react";
import { Button } from "antd";
import './TButton.scss';

interface TButtonProps {
  children: React.ReactNode;
  tvariant?: "primary" | "secondary" | "tertiary" | "outline";
}

const TButton: React.FC<TButtonProps & React.ComponentProps<typeof Button>> = ({ children, tvariant: variant, ...props }) => {
  return (
    <Button type="primary" {...props} className={`t-button ${variant ? `t-button-${variant}` : ""} ${props.className}`}>
      {children}
    </Button>
  );
};

export default TButton;
