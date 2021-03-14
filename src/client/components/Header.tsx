import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { CountryCard } from './CountryCard';
import Auth from './Auth/Auth';
import { useAuth } from '../context/auth.context';
import { LogOutButton } from './LogOutButton';
import { useTranslation } from 'react-i18next';
import { LanguageSelection } from './LanguageSelection';

export const Header: React.FC = () => {
  const { token } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <header>
        <div className="header-wrapper">
          <nav>
            <Link to="/">LOGO</Link>
          </nav>
          <LanguageSelection />
          <div className="login-wrapper">{!!token ? <LogOutButton /> : <Link to="/login">{t('login')}</Link>}</div>
        <h1>Travel</h1>
        </div>
      </header>
      <section className="main_wrapper">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/card/:id">
            <CountryCard />
          </Route>
          <Route path="/login">
            <Auth />
          </Route>
        </Switch>
      </section>
    </>
  );
};
