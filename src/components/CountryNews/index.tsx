import { ScrollView } from "@progress/kendo-react-scrollview";
import React from "react";
import { Article } from "../../types/countryNews";
import "./styles.css";

interface NewsProps {
  news: Article[];
}

export const CountryNewsComponent: React.FC<NewsProps> = (news) => {
  return (
    <div className="container cardsContainer">
      <ScrollView
        style={{
          width: "100%",
          height: 520,
          backgroundColor: "#1e1e1e",
          display: "flex",
        }}
      >
        {news.news.map((art, index) => {
          return (
            <div className="cardContainerScroll" key={index}>
              <div className="cardScroll">
                <h2>{art.title?.slice(0, art.title.lastIndexOf("-"))}</h2>
                {!!art.author && <h3>Escrito por: {art.author}</h3>}
                <div className="imgContainer">
                  {!!art.urlToImage && (
                    <img className="newsImg" src={art.urlToImage} alt="" />
                  )}
                </div>
                <p className="desc">{art.description}</p>
                <p>Data da publicação: {art.publishedAt}</p>
                <div className="imgContainer">
                  {!!art.url && (
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
  );
};
