import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCountry } from './../context/country.context';
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
  const { countries } = useCountry();
  const [hoverCountry, setHoverCountry] = useState<IHoverCountry>();
  function hoverHandling(event: React.MouseEvent<HTMLElement>) {
    console.log('&&&&&&', event.currentTarget.querySelector('img').currentSrc);
    console.log('&&&&&&', event.currentTarget.querySelectorAll('span'));
    const countryData = event.currentTarget.querySelectorAll('span');
    setHoverCountry({
      img: event.currentTarget.querySelector('img').currentSrc,
      countryName: countryData[0].getAttribute('data-countryName'),
      countryCapital: countryData[1].getAttribute('data-countryCapital'),
    });
  }

  return (
    <>
      {/*<img src={`http://127.0.0.1:3333/assets/by.jpeg`} alt="" />*/}
      <div className="country-list">
        {countries.map((el: any, i) => {
          return (
            <div
              className="country-item"
              data-countryCode={el.alpha2}
              onMouseOver={(event: React.MouseEvent<HTMLElement>) => hoverHandling(event)}
              key={i}
            >
              <Link to={`/card/${el.alpha2}`}>
                <div className="country-description">
                  <span data-countryName={el[`name_${i18next.language}`]}>{el[`name_${i18next.language}`]}</span>
                  <span data-countryCapital={el[`capital_${i18next.language}`]}>{el[`capital_${i18next.language}`]}</span>
                </div>
                <img src={`${baseUrl}/${el.alpha2}/${getRandomImgNumber()}.jpg`} alt={el.name_en} />
              </Link>
            </div>
          );
        })}
        {hoverCountry && (
          <div className="hover-picture">
            <div className="country-description">
              <span>{hoverCountry.countryName}</span>
              <span>{hoverCountry.countryCapital}</span>
            </div>
            <img src={hoverCountry.img} alt={hoverCountry.countryName} />
          </div>
        )}
      </div>
    </>
  );
};
