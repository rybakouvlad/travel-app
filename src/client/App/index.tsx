import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
// import { Main } from '../components/Main';
import '../Style/style.scss';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      {/* <Main /> */}
      <Footer />
    </>
  );
};
