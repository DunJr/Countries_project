import React, { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridDataStateChangeEvent,
} from "@progress/kendo-react-grid";
import { process, State, DataResult } from "@progress/kendo-data-query";
import "@progress/kendo-theme-default/dist/all.css";
import { CountryData } from "../../types/countryInfo";
import "./styles.css";
import { apiCountryInfo } from "../../services/api";

const initialDataState: State = {
  sort: [{ field: "name.common", dir: "asc" }],
  take: 10,
  skip: 0,
  filter: {
    logic: "and",
    filters: [{ field: "name.common", operator: "contains", value: "" }],
  },
};

const fetchData = async () => {
  try {
    const response = await apiCountryInfo.get("/all");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

interface FlagCellProps {
  dataItem: CountryData;
}

const FlagCell: React.FC<FlagCellProps> = ({ dataItem }) => {
  const flagUrl = dataItem.flags.png;

  return (
    <td
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img className="countryFlag" src={flagUrl} alt={dataItem.flags.alt} />
    </td>
  );
};

export const MainPage: React.FC = () => {
  const [dataState, setDataState] = useState<State>(initialDataState);
  const [dataResult, setDataResult] = useState<DataResult>({} as DataResult);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData();
        setDataResult(process(data, dataState) as DataResult);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dataState]);

  const onDataStateChange = (e: GridDataStateChangeEvent) => {
    setDataState(e.dataState);
  };

  return (
    <div className="container">
      <h1>Nation Insights</h1>
      <div className="descOntainer">
        <h2 className="appDesc">
          Nation Insights oferece uma visão detalhada e interativa de
          informações globais. Explore dados sobre países, incluindo notícias,
          feriados, e estatísticas essenciais, proporcionando uma compreensão
          abrangente das nações ao redor do mundo.
        </h2>
      </div>
      <Grid
        data={dataResult.data}
        total={dataResult.total}
        filterable={true}
        pageable={true}
        {...dataState}
        onDataStateChange={onDataStateChange}
        className=" mainGrid"
      >
        <Column
          className="flagCol col"
          field="flag"
          title="Bandeira"
          cell={FlagCell}
          filterable={false}
        />
        <Column
          className="nameCol col"
          field="name.common"
          title="Nome do País"
        />
        <Column className="areaCol col" field="area" title="Área" />
        <Column
          className="populationCol col"
          field="population"
          title="População"
        />
        <Column
          className="currencyCol col"
          title="Moedas"
          cell={(props) => (
            <td>
              {props.dataItem.currencies &&
                Object.values(props.dataItem.currencies)
                  .map((currency) => (currency as { name: string }).name)
                  .join(", ")}
            </td>
          )}
        />
        <Column
          className="actionsCol col"
          title="Ações"
          cell={({ dataItem }) => (
            <td>
              <a
                href={`http://localhost:5173/countryInfoPage/${dataItem.name.common}`}
              >
                Mais informações.
              </a>
            </td>
          )}
        />
      </Grid>
    </div>
  );
};
