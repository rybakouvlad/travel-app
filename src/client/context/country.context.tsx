import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';

export interface ICountry {
  alpha2?: string;
  name_by?: string;
  name_ru?: string;
  name_en?: string;
  capital_by?: string;
  capital_ru?: string;
  capital_en?: string;
  description_by?: string;
  description_ru?: string;
  description_en?: string;
  currency?: string;
}
interface IContext {
  countries: ICountry[];
  getCountry(alpha2: string): ICountry;
  loading: boolean;
  ready: boolean;
}
interface IProps {
  children: React.ReactNode;
}
const CountryContext = createContext<IContext>(null);
export const useCountry = () => {
  return useContext(CountryContext);
};

export const Country = ({ children }: IProps) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const { request, loading } = useHttp();
  const [ready, setReady] = useState(false);
  const getData = useCallback(async () => {
    try {
      const data = await request('/api/country/all/ru');
      setCountries(data);
      setReady(true);
    } catch (e) {
      console.log('Error: ', e.message);
    }
  }, [request]);
  useEffect(() => {
    getData();
  }, [getData]);

  const getCountry = (alpha2: string): ICountry => {
    return countries.find((el) => {
      console.log('!!!!', el.alpha2);
      return el.alpha2 == alpha2;
    });
  };
  return (
    <CountryContext.Provider value={{ ready, countries, getCountry, loading }}>{children}</CountryContext.Provider>
  );
};

export const CountryProvider = React.memo(Country);
