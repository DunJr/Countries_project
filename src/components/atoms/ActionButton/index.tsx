import React from "react";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
}

export const ActionButton: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="k-button">
      {label}
    </button>
  );
};
