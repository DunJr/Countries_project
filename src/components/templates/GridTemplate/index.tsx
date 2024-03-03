import React from "react";
import CountryGrid from "../../organisms/CountryGrid/index";
import { DataResult, State } from "@progress/kendo-data-query";
import { GridDataStateChangeEvent } from "@progress/kendo-react-grid";

interface CountryTemplateProps {
  dataResult: DataResult;
  dataState: State;
  onDataStateChange: (e: GridDataStateChangeEvent) => void;
  onDetailsClick: (dataItem: unknown) => void;
}

export const CountryTemplate: React.FC<CountryTemplateProps> = ({
  dataResult,
  dataState,
  onDataStateChange,
  onDetailsClick,
}) => {
  return (
    <div id="container">
      <CountryGrid
        dataResult={dataResult}
        dataState={dataState}
        onDataStateChange={onDataStateChange}
        onDetailsClick={onDetailsClick}
      />
    </div>
  );
};
