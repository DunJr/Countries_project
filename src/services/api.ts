import axios from "axios";

export const apiCountryInfo = axios.create({
  baseURL: "https://restcountries.com/v3.1/",
});

export const apiCountryNews = axios.create({
  baseURL: "https://newsapi.org/v2/",
});

export const apiCountryHolidays = axios.create({
  baseURL: "https://calendarific.com/api/v2/",
});
