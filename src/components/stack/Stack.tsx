import React from "react";

interface StackProps {
  classnames?: string;
  direction?: "row" | "column";
  gap?: number;
  children: React.ReactNode;
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  style?: React.CSSProperties;
}

const Stack: React.FC<StackProps> = (props) => {
  const { direction = "row", gap = 0, justifyContent, alignItems, style } = props;
  const dir = direction === "row" ? "row" : "column";
  return (
    <div className={props.classnames} style={{
      display: "flex",
      flexDirection: dir,
      gap: `${gap}px`,
      justifyContent,
      alignItems,
      ...style,
    }}>
      {props.children}
    </div>
  );
};

export default Stack;
