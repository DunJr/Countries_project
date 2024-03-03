import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScrollView } from "@progress/kendo-react-scrollview";
import { ChipList, ChipProps } from "@progress/kendo-react-buttons";
import {
  DateInput,
  DateInputChangeEvent,
} from "@progress/kendo-react-dateinputs";

import { CountryData } from "../../interfaces/countryInfo";
import { Article } from "../../interfaces/countryNews";
import { staticNews } from "./staticNews";
import { staticHolidays } from "./staticHolidays";

import "./styles.css";

export const CountryPage: React.FC = () => {
  const [countryData, setCountryData] = useState<CountryData>();
  const [countryNews, setCountryNews] = useState<Article[]>(staticNews);
  const [countryHolidays, setCountryHolidays] = useState(staticHolidays);
  const [filteredCountryHolidays, setFilteredCountryHolidays] =
    useState(staticHolidays);
  const [newsLoaded, setNewsLoaded] = useState(true);
  const [holidaysLoaded, setHolidaysLoaded] = useState(true);
  const [category, setCategory] = useState("News");
  const [holidayDate, setHolidayDate] = useState("-");
  const { id } = useParams<{ id: string }>();

  const [dateValue, setDateValue] = React.useState<Date | null>();
  const changeDate = (event: DateInputChangeEvent) => {
    setDateValue(event.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${id}?fullText=true`
      );
      const [data] = await response.json();
      setCountryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await fetch(
        `https://calendarific.com/api/v2/holidays?&api_key=rtASr8e10AU2FoqUQESRjKuTAV2KI7Ys&country=${countryData?.cca2}&year=2019`
      );
      const {
        response: { holidays },
      } = await response.json();
      setCountryHolidays(holidays);

      setFilteredCountryHolidays(holidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${countryData?.cca2}&apiKey=40173b7c272345b89e3fff71a0b6b2f8`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { articles = [] } = await response.json();
      setCountryNews(articles);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (countryData && !newsLoaded) {
      setNewsLoaded(true);
      fetchNews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryData]);

  useEffect(() => {
    if (countryData && !holidaysLoaded) {
      setHolidaysLoaded(true);
      fetchHolidays();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryData]);

  const handleSelector = ({ value }: ChipProps) => {
    setCategory(value);
  };

  const handleDateSelector = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = dateValue?.toString();

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

    const month: string =
      date && date.slice(4, 7)
        ? monthAbbreviations[date.slice(4, 7)] || ""
        : "";
    const formattedDate: string = month + "-" + date?.slice(8, 10);
    setHolidayDate(formattedDate);

    const filteredHolidays = countryHolidays.filter((news) => {
      return news.date.iso.includes(holidayDate);
    });
    setFilteredCountryHolidays(filteredHolidays);
  };

  return (
    <div className="component">
      <div className="container">
        <a className="back-button" href="/">
          Voltar
        </a>
        <div className="infoContainer">
          <h1 className="item1">Informações do país</h1>
          <figure className="item2">
            <img
              className="country-flag"
              src={countryData?.flags.png}
              alt={countryData?.flags.alt}
            />
            <figcaption></figcaption>
          </figure>
          <ul className="item3">
            <li>Nome: {countryData?.name.common}</li>
            <li>Área: {countryData?.area}</li>
            <li>
              Paises vizinhos:
              {countryData?.borders ? (
                countryData?.borders.join(", ")
              ) : (
                <span> --- </span>
              )}
            </li>
            <li>Capital: {countryData?.capital}</li>
            <li>
              Transito (Lado):
              {countryData?.car.side === "left" ? "Esquerdo" : "Direito"}
            </li>
            <li>Sigla: {countryData?.cca2}</li>
            <li>Continente(s): {countryData?.continents}</li>
            <li>
              Moeda(s):
              {countryData?.currencies &&
                Object.values(countryData?.currencies)
                  .map((currency) => (currency as { name: string }).name)
                  .join(", ")}
            </li>
            <li>
              DDI:{" "}
              {countryData?.idd.root ? (
                countryData?.idd.root
              ) : (
                <span>Não Possui</span>
              )}
              {countryData?.idd.suffixes?.length === 1
                ? countryData?.idd.suffixes[0]
                : null}
            </li>
            <li>Tem praia: {countryData?.landlocked ? "Não" : "Sim"}</li>
            <li>
              Languages:
              {countryData?.languages &&
                Object.values(countryData?.languages).join(", ")}
            </li>
            <li>
              <a
                target="_blank"
                className="google-maps"
                href={`${countryData?.maps.googleMaps}`}
              >
                Google maps
              </a>
            </li>
            <li>População: {countryData?.population}</li>
            <li>
              Região/Suregiao:
              {` ${countryData?.region}/${countryData?.subregion}`}
            </li>
            <li>Fusorarios {countryData?.timezones.join(", ")}</li>
            <li>
              Nome em diferentes idiomas{" "}
              {countryData?.translations &&
                Object.entries(countryData?.translations)
                  .map(
                    ([language, translation]) =>
                      `${language}: ${translation.common}`
                  )
                  .join(", ")}
            </li>
          </ul>
        </div>
      </div>
      <div className="container">
        <ChipList
          selection="single"
          onChange={handleSelector}
          data={[
            { text: "News", value: "News" },
            { text: "Holidays", value: "Holidays" },
          ]}
        />
      </div>
      {countryNews[0] && category === "News" ? (
        <div className="container">
          <ScrollView
            style={{
              width: "100%",
              height: 520,
              backgroundColor: "#1e1e1e",
              display: "flex",
            }}
          >
            {countryNews.map((art, index) => {
              return (
                <div className="cardContainerScroll" key={index}>
                  <div className="cardScroll">
                    <h2>{art.title?.slice(0, art.title.lastIndexOf("-"))}</h2>
                    {art.author && <h3>Escrito por: {art.author}</h3>}
                    <div className="imgContainer">
                      {art.urlToImage && (
                        <img className="newsImg" src={art.urlToImage} alt="" />
                      )}
                    </div>
                    <p className="desc">{art.description}</p>
                    <p>Data da publicação: {art.publishedAt}</p>
                    <div className="imgContainer">
                      {art.url && (
                        <a target="_blank" href={art.url}>
                          Ir para o site da notícia
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollView>
        </div>
      ) : null}

      {category === "Holidays" && countryHolidays[0] && (
        <div className="container">
          <form className="k-form" onSubmit={handleDateSelector}>
            <div className="holidayDateSelectorContainer">
              <DateInput
                format={{
                  skeleton: "MMMd",
                }}
                value={dateValue}
                onChange={changeDate}
                width={85}
              />
            </div>
          </form>
          <div className="holidayCardContainer">
            {filteredCountryHolidays[0] ? (
              filteredCountryHolidays.map((hol, index) => (
                <div className="holidayCard" key={index}>
                  <p>Nome do feriado: {hol.name}</p>
                  <p>Descrição: {hol.description}</p>
                  <p>Data(mes-dia): {hol.date.iso.slice(5)}</p>
                  <p>Tipo: {hol.type.join(", ")}</p>
                </div>
              ))
            ) : (
              <div className="noHolidaysFoundCard">
                <p className="noHolidaysFoundMessage">
                  Nenhum feriado encontrado para a data selecionada.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

{
  /* {countryNews[0] && (
        <div className="container">
          <ul className="cardContainer">
            {countryNews?.map((art: Article, index) => {
              return (
                <li className="card" key={index}>
                  <h2>{art.title?.slice(0, art.title.lastIndexOf("-"))}</h2>
                  {art.author && <h3>Escrito por: {art.author}</h3>}
                  <div className="imgContainer">
                    {art.urlToImage && (
                      <img className="newsImg" src={art.urlToImage} alt="" />
                    )}
                  </div>
                  <p>Descrição: {art.description}</p>
                  <p>Data da publicação: {art.publishedAt}</p>
                  <div className="imgContainer">
                    {art.url && (
                      <a target="_blank" href={art.url}>
                        Ir para o site da notícia
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )} */
}

// <div className="holidayCardContainer">
//             <ScrollView
//               style={{
//                 width: "100%",
//                 height: 280,
//                 backgroundColor: "#1e1e1e",
//                 display: "flex",
//                 justifyContent: "space-around",
//               }}
//             >
//               {filteredCountryHolidays[0] ? (
//                 filteredCountryHolidays.map((hol, index) => (
//                   <div className="holidayCard" key={index}>
//                     <p>Nome do feriado: {hol.name}</p>
//                     <p>Descrição: {hol.description}</p>
//                     <p>Data(mes-dia): {hol.date.iso.slice(5)}</p>
//                     <p>Tipo: {hol.type.join(", ")}</p>
//                   </div>
//                 ))
//               ) : (
//                 <div className="noHolidaysFoundCard">
//                   <p className="noHolidaysFoundMessage">
//                     Nenhum feriado encontrado para a data selecionada.
//                   </p>
//                 </div>
//               )}
//             </ScrollView>
//           </div>
