import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { CountryCard } from './CountryCard';
import Auth from './Auth/Auth';
import { useAuth } from '../context/auth.context';
import { LogOutButton } from './LogOutButton';
// import lang from '../language';
import { useTranslation } from 'react-i18next';
import { LanguageSelection } from './LanguageSelection';

export const Header: React.FC = () => {
  const { token } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <header>
        <nav>
          <Link to="/">LOGO</Link>
        </nav>
        <LanguageSelection />
        <div>{!!token ? <LogOutButton /> : <Link to="/login">{t('login')}</Link>}</div>
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
