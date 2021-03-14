import React, { Suspense } from 'react';
import { Init } from '../components/Init';
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
            <Init />
          </AuthProvider>
        </CountryProvider>
      </Suspense>
    </>
  );
};
