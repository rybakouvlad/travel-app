import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { CountryCard } from './CountryCard';
import Auth from './Auth/Auth';

export const Header: React.FC = () => {
  return (
    <>
      <header>
        <div>
          <Link to="/">LOGO</Link>
          <Link to="/login">login</Link>
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
