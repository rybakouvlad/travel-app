import React, { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
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
  _id?: string;
}
interface IContext {
  countries: ICountry[];
  suitableCountries: ICountry[];
  setSuitableCountries: Dispatch<SetStateAction<ICountry[]>>;
  isSearch: boolean;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
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
  const [suitableCountries, setSuitableCountries] = useState<ICountry[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const { request, loading } = useHttp();
  const [ready, setReady] = useState(false);
  const getData = useCallback(async () => {
    try {
      const data = await request('/api/country/all/ru');
      setCountries(data);
      setReady(true);
      console.log(data);
    } catch (e) {
      console.log('Error: ', e.message);
    }
  }, [request]);
  useEffect(() => {
    getData();
  }, [getData]);

  const getCountry = (alpha2: string): ICountry => {
    return countries.find((el) => {
      return el.alpha2 == alpha2;
    });
  };
  return (
    <CountryContext.Provider
      value={{ ready, countries, getCountry, loading, isSearch, setIsSearch, suitableCountries, setSuitableCountries }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const CountryProvider = React.memo(Country);
