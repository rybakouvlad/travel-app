import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { CountryCard } from './CountryCard';

export const Header: React.FC = () => {
  return (
    <>
      <header>
        <div>
          <Link to="/">LOGO</Link>
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
        </Switch>
      </section>
    </>
  );
};
