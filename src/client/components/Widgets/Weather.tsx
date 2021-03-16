import React, { useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
interface IProps {
  countryName: string;
}

interface IWeather {
  weatherIcon: any;
  temperature: any;
  description: any;
  humidity: any;
  weatherSpeed: any;
}

export const Weather: React.FC<IProps> = (props: IProps) => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<IWeather>();

  const getWeather = useCallback(async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.countryName}&lang=${
        i18next.language === 'by' ? 'be' : i18next.language
      }&appid=05a5584fc1a3fc55822a69797a330f33&units=metric`;
      const result = await fetch(url);
      const data = await result.json();
      setWeather({
        weatherIcon: data.weather[0].icon,
        temperature: data.main.temp.toFixed(0),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        weatherSpeed: data.wind.speed,
      });
    } catch (error) {}
  }, [props.countryName]);

  useEffect(() => {
    getWeather();
  }, [props.countryName, i18next.language]);
  if (!props.countryName || !weather) {
    return <h1>LOADING</h1>;
  }
  return (
    <div className="weather">
      <div className="weather__container">
        <img src={'http://openweathermap.org/img/w/' + weather.weatherIcon + '.png'} alt="weather" />
        <div className="precipitation">{weather.description}</div>
      </div>

      <div className="weather__container">
        <div className="temperature">{`${weather.temperature} °С`}</div>

        <div className="speed">{`${t('speed')}: ${weather.weatherSpeed}km/h`}</div>
        <div className="relative-humidity">{`${t('humidity')}: ${weather.humidity}%`}</div>
      </div>
    </div>
  );
};
