import React, { Suspense } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AuthProvider } from '../context/auth.context';
import '../Style/style.scss';
import './i18n';

export const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={null}>
        <AuthProvider>
          <Header />
          <Footer />
        </AuthProvider>
      </Suspense>
    </>
  );
};
