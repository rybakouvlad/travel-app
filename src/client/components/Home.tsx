import React from 'react';
import { Link } from 'react-router-dom';
import { useCountry } from '../context/country.context';

const countruList = [
  {
    img: 'IMG',
    name: 'Minsk',
  },
  {
    img: 'IMG',
    name: 'Pinsk',
  },
  {
    img: 'IMG',
    name: 'Mogilev',
  },
  {
    img: 'IMG',
    name: 'Gomel',
  },
  {
    img: 'IMG',
    name: 'Brest',
  },
];

export const Home: React.FC = () => {
  const { countries } = useCountry();
  return (
    <>
      <img src={`http://127.0.0.1:3333/assets/by.jpeg`} alt="" />
      <ul>
        {countruList.map((el, i) => {
          return (
            <li key={i}>
              <Link to={`card/${el.name}`}>card</Link>
            </li>
          );
        })}
        <h1>{JSON.stringify(countries)}</h1>
      </ul>
    </>
  );
  //return <Link to="card/21">card</Link>;
};
