import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { CountryCard } from './CountryCard';
import Auth from './Auth/Auth';
import { useAuth } from '../context/auth.context';
import { LogOutButton } from './LogOutButton';
import lang from '../language';
export const Header: React.FC = () => {
  const { token } = useAuth();

  return (
    <>
      <header>
        <nav>
          <Link to="/">LOGO</Link>
        </nav>
        <div>{!!token ? <LogOutButton /> : <Link to="/login">{lang.login['en']}</Link>}</div>
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
