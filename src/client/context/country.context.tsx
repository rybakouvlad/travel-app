import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';

interface ICountry {
  alpha2: string;
  name_by: string;
  name_ru: string;
  name_en: string;
  capital_by: string;
  capital_ru: string;
  capital_en: string;
  description_by: string;
  description_ru: string;
  description_en: string;
}
interface IContext {
  countries: ICountry[];
}
interface IProps {
  children: React.ReactNode;
}
const CountryContext = createContext<IContext>(null);
export const useCountry = () => {
  return useContext(CountryContext);
};

export const CountryProvider = ({ children }: IProps) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const { request } = useHttp();
  const getData = useCallback(async () => {
    try {
      const data = await request('/api/country/all/ru');
      setCountries(data);
    } catch (e) {
      console.log('Error: ', e.message);
    }
  }, [request]);
  useEffect(() => {
    getData();
  }, [getData]);
  return <CountryContext.Provider value={{ countries }}>{children}</CountryContext.Provider>;
};
