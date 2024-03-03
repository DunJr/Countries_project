import React from "react";
import { ActionButton } from "../../atoms/ActionButton/index.tsx";

interface CountryGridActionsProps {
  onDetailsClick: (dataItem: unknown) => void;
}

const CountryGridActions: React.FC<CountryGridActionsProps> = ({
  onDetailsClick,
}) => {
  return (
    <td>
      <ActionButton onClick={onDetailsClick} label="Details" />
    </td>
  );
};

export default CountryGridActions;
