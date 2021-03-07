import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AuthProvider } from '../context/auth.context';
import '../Style/style.scss';

export const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <Footer />
      </AuthProvider>
    </>
  );
};
