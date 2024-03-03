// CountryGrid.tsx
import React from "react";
import {
  Grid,
  GridColumn as Column,
  GridDataStateChangeEvent,
} from "@progress/kendo-react-grid";
import { State, DataResult } from "@progress/kendo-data-query";
import "@progress/kendo-theme-default/dist/all.css";
import CountryGridActions from "../../molecules/CountryGridActions";

interface CountryGridProps {
  dataResult: DataResult;
  dataState: State;
  onDataStateChange: (e: GridDataStateChangeEvent) => void;
  onDetailsClick: (dataItem: unknown) => void;
}

const CountryGrid: React.FC<CountryGridProps> = ({
  dataResult,
  dataState,
  onDataStateChange,
  onDetailsClick,
}) => {
  return (
    <Grid
      data={dataResult.data}
      total={dataResult.total}
      filterable={true}
      pageable={true}
      {...dataState}
      onDataStateChange={onDataStateChange}
      className="mainGrid"
    >
      <Column field="name.common" title="Country Name" />
      <Column field="area" title="Area" />
      <Column field="population" title="Population" />
      <Column field="currencies[0]" title="Currencies" />
      <Column
        title="Actions"
        cell={(props) => (
          <CountryGridActions
            onDetailsClick={() => onDetailsClick(props.dataItem)}
          />
        )}
      />
    </Grid>
  );
};

export default CountryGrid;
