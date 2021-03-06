import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <ul>
      {countruList.map((el, i) => {
        return (
          <li key={i}>
            <Link to={`card/${el.name}`}>card</Link>
          </li>
        );
      })}
    </ul>
  );
  //return <Link to="card/21">card</Link>;
};
