import React, { useState, useEffect } from "react";
import { Holiday } from "../../types/countryHolidays";
import "./style.css";

import {
  DropDownButton,
  DropDownButtonItemClickEvent,
} from "@progress/kendo-react-buttons";

interface HolidayProps {
  holidays: Holiday[];
}

const items = [
  "Todos", // Adicione "Todos" à lista de itens
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const CountryHolidaysComp: React.FC<HolidayProps> = ({ holidays }) => {
  const [selectedDate, setSelectedDate] = useState("-");
  const [filteredCountryHolidays, setFilteredCountryHolidays] =
    useState<Holiday[]>(holidays);

  console.log(holidays);

  useEffect(() => {
    setFilter(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, holidays]);

  const handleDateSelector = (e: DropDownButtonItemClickEvent) => {
    const date = e.item;

    if (date === "Todos") {
      clearFilterHandler();
    } else {
      const monthAbbreviations: Record<string, string> = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };

      const month: string = monthAbbreviations[date] || "";

      setSelectedDate(month);
      console.log("Selected Month:", month);
    }
  };

  const setFilter = (filterDate: string) => {
    const filteredHolidays =
      filterDate === "-"
        ? holidays // If no filter, show all holidays
        : filterDate === "Todos"
        ? holidays // If "Todos" is selected, show all holidays
        : holidays.filter((holiday) => {
            const holidayMonth = holiday.date.iso.slice(5, 7);
            return holidayMonth === filterDate;
          });

    setFilteredCountryHolidays(filteredHolidays);
  };

  const clearFilterHandler = () => {
    setSelectedDate("-");
  };

  return (
    <div className="container">
      <div className="k-form holidayDate">
        <div>
          <div className="holidayDateSelectorContainer">
            <h2>Filtrar Feriados por Mês.</h2>
            <DropDownButton
              popupSettings={{ animate: true, popupClass: "my-popup" }}
              items={items}
              text="Mês"
              onItemClick={handleDateSelector}
              className="dateDropDownButton"
            />
          </div>

          {/* <div className="holidayFilterClearContainer">
            <h2>Remover filtro.</h2>
            <Button
              type="button"
              onClick={clearFilterHandler}
              className="dateFilterRem"
            >
              Remover
            </Button>
          </div> */}
        </div>
      </div>
      <div className="holidayCardContainer">
        {filteredCountryHolidays.map((hol, index) => (
          <div className="holidayCard" key={index}>
            <p>Nome do feriado: {hol.name}</p>
            <p>Descrição: {hol.description}</p>
            <p>Data(mes-dia): {hol.date.iso.slice(5)}</p>
            <p>Tipo: {hol.type.join(", ")}</p>
          </div>
        ))}
        {filteredCountryHolidays.length === 0 && (
          <div className="noHolidaysFoundCard">
            <p className="noHolidaysFoundMessage">
              Nenhum feriado encontrado para a data selecionada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
