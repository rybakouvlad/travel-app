import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {ICountry, useCountry} from './../context/country.context';
import i18next from 'i18next';

const baseUrl = 'http://127.0.0.1:3333/assets/county';
const maxPicturesNumber = 5;
interface IHoverCountry {
  img: string;
  countryName: string;
  countryCapital: string;
}
function getRandomImgNumber() {
  return Math.floor(Math.random() * Math.floor(maxPicturesNumber)) + 1;
}
export const Home: React.FC = () => {
  const { countries, isSearch, suitableCountries } = useCountry();
  const [imageNumber] = useState<number>(getRandomImgNumber());
  const [hoverCountry, setHoverCountry] = useState<IHoverCountry>({
    img: `${baseUrl}/${countries[0].alpha2}/${imageNumber}.jpg`,
    countryName: countries[0][`name_${i18next.language}` as keyof ICountry],
    countryCapital: countries[0][`capital_${i18next.language}` as keyof ICountry],
  });
  function hoverHandling(event: React.MouseEvent<HTMLElement>) {
    const countryData = event.currentTarget.querySelectorAll('span');
    setHoverCountry({
      img: event.currentTarget.querySelector('img').currentSrc,
      countryName: countryData[0].getAttribute('data-countryname'),
      countryCapital: countryData[1].getAttribute('data-countrycapital'),
    });
  }

  return (
    <>
      {/*<div>*/}
      {isSearch ? (
        <div className="country-list">
          {suitableCountries.map((el: any, i) => {
            return (
              <div className="country-item" data-countrycode={el.alpha2} key={i}>
                <Link to={`/card/${el.alpha2}`}>
                  <div className="country-description">
                    <span data-countryname={el[`name_${i18next.language}`]}>{el[`name_${i18next.language}`]}</span>
                    <span data-countrycapital={el[`capital_${i18next.language}`]}>
                      {el[`capital_${i18next.language}`]}
                    </span>
                  </div>
                  <img src={`${baseUrl}/${el.alpha2}/${imageNumber}.jpg`} alt={el.name_en} />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="country-list">
          {countries.map((el: any, i) => {
            return (
              <div
                className="country-item"
                data-countrycode={el.alpha2}
                onMouseOver={(event: React.MouseEvent<HTMLElement>) => hoverHandling(event)}
                key={i}
              >
                <Link to={`/card/${el.alpha2}`}>
                  <div className="country-description">
                    <span data-countryname={el[`name_${i18next.language}`]}>{el[`name_${i18next.language}`]}</span>
                    <span data-countrycapital={el[`capital_${i18next.language}`]}>
                      {el[`capital_${i18next.language}`]}
                    </span>
                  </div>
                  <img src={`${baseUrl}/${el.alpha2}/${imageNumber}.jpg`} alt={el.name_en} />
                </Link>
              </div>
            );
          })}
          {hoverCountry ? (
            <div className="hover-picture">
              <div className="country-description">
                <span>{hoverCountry.countryName}</span>
                <span>{hoverCountry.countryCapital}</span>
              </div>
              <img src={hoverCountry.img} alt={hoverCountry.countryName} />
            </div>
          ) : null}
        </div>
      )}
      {/*</div>*/}
    </>
  );
};
