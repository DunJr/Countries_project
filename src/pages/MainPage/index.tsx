// Importando bibliotecas e estilos necessários
import React, { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridDataStateChangeEvent,
} from "@progress/kendo-react-grid";
import { process, State, DataResult } from "@progress/kendo-data-query";
import "@progress/kendo-theme-default/dist/all.css";

// Importando interface necessária
import { CountryData } from "../../interfaces/countryInfo";

// Importando estilos locais
import "./styles.css";

// Estado inicial para as configurações do grid
const initialDataState: State = {
  sort: [{ field: "name.common", dir: "asc" }],
  take: 10,
  skip: 0,
  filter: {
    logic: "and",
    filters: [{ field: "name.common", operator: "contains", value: "" }],
  },
};

// Função para buscar dados da API de países
const fetchData = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data: CountryData[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error; // Lança novamente o erro para que o chamador o manipule
  }
};

// Componente para renderizar a célula da bandeira
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

// Componente principal da página
export const MainPage: React.FC = () => {
  const [dataState, setDataState] = useState<State>(initialDataState);
  const [dataResult, setDataResult] = useState<DataResult>({} as DataResult);
  // const [fData, setfData] = useState<CountryData[]>([]);

  // Efeito para buscar e processar dados quando o estado de dataState muda
  useEffect(() => {
    const fetchDataAndProcess = async () => {
      try {
        const data = await fetchData();
        // setfData(data);
        setDataResult(process(data, dataState) as DataResult);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataAndProcess();
  }, [dataState]);

  // Função para lidar com alterações no estado dos dados do grid
  const onDataStateChange = (e: GridDataStateChangeEvent) => {
    setDataState(e.dataState);
  };

  // Renderização do componente
  return (
    <div className="container">
      <Grid
        data={dataResult.data}
        total={dataResult.total}
        filterable={true}
        pageable={true}
        {...dataState}
        onDataStateChange={onDataStateChange}
        className="mainGrid"
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
          cell={(props) => (
            <td>
              <a
                href={`http://localhost:5173/countryInfoPage/${props.dataItem.name.common}`}
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

// // MainPage.tsx
// import React, { useEffect, useState } from "react";
// import { process, State, DataResult } from "@progress/kendo-data-query";
// import "@progress/kendo-theme-default/dist/all.css";

// import { CountryTemplate } from "../../components/templates/GridTemplate/index";
// import { CountryData } from "../../interfaces/countryInfo";
// import { GridDataStateChangeEvent } from "@progress/kendo-react-grid";

// const initialDataState: State = {
//   sort: [{ field: "ProductName", dir: "asc" }],
//   take: 5,
//   skip: 0,
//   filter: {
//     logic: "and",
//     filters: [{ field: "ProductName", operator: "contains", value: "" }],
//   },
// };

// export const MainPage: React.FC = () => {
//   const [dataState, setDataState] = useState<State>(initialDataState);
//   const [dataResult, setDataResult] = useState<DataResult>({} as DataResult);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("https://restcountries.com/v3.1/all");
//         const data: CountryData[] = await response.json();
//         setDataResult(process(data, dataState) as DataResult);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [dataState]);

//   const onDataStateChange = (e: GridDataStateChangeEvent) => {
//     setDataState(e.dataState);
//   };

//   const handleDetailsClick = (dataItem: unknown) => {
//     // Perform actions with the specific country dataItem
//     console.log("Country Info:", dataItem);
//     // Example: Open a modal with detailed information
//   };

//   return (
//     <CountryTemplate
//       dataResult={dataResult}
//       dataState={dataState}
//       onDataStateChange={onDataStateChange}
//       onDetailsClick={handleDetailsClick}
//     />
//   );
// };
