import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header/Header';

import { useCountry } from '../context/country.context';
import { Loader } from './Loader';

export const Init: React.FC = () => {
  const { ready } = useCountry();
  if (!ready) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};
