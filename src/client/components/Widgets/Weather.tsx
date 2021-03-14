import React, { useCallback, useEffect } from 'react';

interface IProps {
  countryName: string;
}

export const Weather: React.FC<IProps> = (props: IProps) => {
  const getWeather = useCallback(async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.countryName}&lang=en&appid=05a5584fc1a3fc55822a69797a330f33&units=metric`;
      const data = await fetch(url);
      const result = await data.json();
      console.log(result);
    } catch (error) {}
  }, [props.countryName]);

  useEffect(() => {
    getWeather();
  }, [props.countryName]);

  return <h1>Weather</h1>;
};
