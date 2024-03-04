import React from "react";
import { CountryData } from "../../types/countryInfo";
import "./styles.css";

interface CountryInformationProps {
  data?: CountryData;
}

export const CountryInformations: React.FC<CountryInformationProps> = ({
  data,
}) => {
  return (
    <div className="container">
      <a className="back-button" href="/">
        Voltar
      </a>
      <div className="infoContainer">
        <h1 className="item1">Informações do país</h1>
        <figure className="item2">
          <img
            className="country-flag"
            src={data?.flags.png}
            alt={data?.flags.alt}
          />
          <figcaption>{data?.flags.alt}</figcaption>
        </figure>
        <ul className="item3">
          <li>Nome: {data?.name.common}</li>
          <li>Área: {data?.area}</li>
          <li>
            Paises vizinhos:
            {data?.borders ? data?.borders.join(", ") : <span> --- </span>}
          </li>
          <li>Capital: {data?.capital}</li>
          <li>
            Transito (Lado):
            {data?.car.side === "left" ? "Esquerdo" : "Direito"}
          </li>
          <li>Sigla: {data?.cca2}</li>
          <li>Continente(s): {data?.continents}</li>
          <li>
            Moeda(s):
            {!!data?.currencies &&
              Object.values(data?.currencies)
                .map((currency) => (currency as { name: string }).name)
                .join(", ")}
          </li>
          <li>
            DDI: {data?.idd.root ? data?.idd.root : <span>Não Possui</span>}
            {data?.idd.suffixes?.length === 1 ? data?.idd.suffixes[0] : null}
          </li>
          <li>Tem praia: {data?.landlocked ? "Não" : "Sim"}</li>
          <li>
            Languages:
            {!!data?.languages && Object.values(data?.languages).join(", ")}
          </li>
          <li>
            <a
              target="_blank"
              className="google-maps"
              href={`${data?.maps.googleMaps}`}
            >
              Google maps
            </a>
          </li>
          <li>População: {data?.population}</li>
          <li>
            Região/Suregiao:
            {` ${data?.region}/${data?.subregion}`}
          </li>
          <li>Fusorarios {data?.timezones.join(", ")}</li>
          <li>
            Nome em diferentes idiomas{" "}
            {!!data?.translations &&
              Object.entries(data?.translations)
                .map(
                  ([language, translation]) =>
                    `${language}: ${translation.common}`
                )
                .join(", ")}
          </li>
        </ul>
      </div>
    </div>
  );
};
