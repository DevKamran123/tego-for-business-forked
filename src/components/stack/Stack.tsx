import React from "react";

interface StackProps {
  classnames?: string;
  direction?: "row" | "column";
  gap?: number;
  children: React.ReactNode;
}

const Stack: React.FC<StackProps> = (props) => {
  const { direction = "row", gap = 0 } = props;
  const dir = direction === "row" ? "row" : "column";
  return (
    <div className={props.classnames} style={{
      display: "flex",
      flexDirection: dir,
      gap: `${gap}px`,
    }}>
      {props.children}
    </div>
  );
};

export default Stack;
