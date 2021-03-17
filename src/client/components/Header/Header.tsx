import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Home } from '../Home';
import { CountryCard } from '../CountryPage/CountryCard';
import Auth from '../Auth/Auth';
import { useAuth } from '../../context/auth.context';
import { LogOutButton } from './LogOutButton';
import { useTranslation } from 'react-i18next';
import { LanguageSelection } from './LanguageSelection';
import { Search } from './Search';

export const Header: React.FC = () => {
  const { token } = useAuth();
  const { t } = useTranslation();
  const { isExact } = useRouteMatch('/');
  return (
    <>
      <header>
        <div className="header-wrapper">
          <nav>
            <Link to="/" className="logo-link">
              <div className="logo-wrapper">
                <img src={`${process.env.PATH_LOCAL}/assets/logo.svg`} alt="travel around the world" />
                <p>Travel around the world</p>
              </div>
            </Link>
          </nav>
          <LanguageSelection />
          <div className="login-wrapper">{!!token ? <LogOutButton /> : <Link to="/login">{t('login')}</Link>}</div>
          <h1>Travel</h1>
          {isExact ? <Search /> : null}
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
