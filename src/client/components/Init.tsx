import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

import { useCountry } from '../context/country.context';

export const Init: React.FC = () => {
  const { ready } = useCountry();
  if (!ready) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};
