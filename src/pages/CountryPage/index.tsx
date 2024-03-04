import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChipList, ChipProps } from "@progress/kendo-react-buttons";

import { CountryData } from "../../types/countryInfo";
import { Article } from "../../types/countryNews";

import { CountryInformations } from "../../components/CountryInfo/idnex";

import "./styles.css";
import { Holiday } from "../../types/countryHolidays";
import {
  apiCountryHolidays,
  apiCountryInfo,
  apiCountryNews,
} from "../../services/api";
import { CountryNewsComponent } from "../../components/CountryNews";
import { CountryHolidaysComp } from "../../components/CountryHolidays";

export const CountryPage: React.FC = () => {
  const [countryData, setCountryData] = useState<CountryData>();
  const [countryNews, setCountryNews] = useState<Article[]>([]);
  const [countryHolidays, setCountryHolidays] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useState<Holiday[]>([]);

  const [newsLoaded, setNewsLoaded] = useState(false);
  const [holidaysLoaded, setHolidaysLoaded] = useState(false);
  const [category, setCategory] = useState("News");
  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    try {
      const response = await apiCountryInfo.get(`/name/${id}?fullText=true`);
      const [data]: CountryData[] = await response.data;
      setCountryData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchHolidays = async () => {
    try {
      const response = await apiCountryHolidays.get(
        `holidays?&api_key=rtASr8e10AU2FoqUQESRjKuTAV2KI7Ys&country=${countryData?.cca2}&year=2019`
      );
      const {
        response: { holidays },
      } = await response.data;

      // Adicione verificação para garantir que holidays não seja undefined
      if (holidays) {
        setCountryHolidays(holidays);
      } else {
        console.error("Holidays array is undefined");
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const url =
        `top-headlines?country=${countryData?.cca2}&` +
        "apiKey=8272e185fbea46c1ab18667173d8bd4a";
      const response = await apiCountryNews.get(url);

      if (!response.status) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { articles = [] } = await response.data;
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

  return (
    <div className="component">
      <CountryInformations data={countryData} />
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
      {!!countryNews[0] && category === "News" ? (
        <div className="container">
          <CountryNewsComponent news={countryNews} />
        </div>
      ) : null}

      {!!(category === "Holidays" && countryHolidays[0]) && (
        <CountryHolidaysComp holidays={countryHolidays} />
      )}
    </div>
  );
};
