import React, { Suspense } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AuthProvider } from '../context/auth.context';
import '../Style/style.scss';
import './i18n';
import { CountryProvider } from '../context/country.context';

export const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={null}>
        <CountryProvider>
          <AuthProvider>
            <Header />
            <Footer />
          </AuthProvider>
        </CountryProvider>
      </Suspense>
    </>
  );
};
