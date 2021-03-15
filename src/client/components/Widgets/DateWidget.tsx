import React, { useCallback, useEffect, useState } from 'react';
import i18next from 'i18next';
import 'moment-timezone';
import moment from 'moment';
import Moment from 'react-moment';
interface IProps {
  countryName: string;
  alpha2: string;
  capital: string;
}
export const DateWidget: React.FC<IProps> = (props: IProps) => {
  const [zone, setZone] = useState('');
  const getZone = useCallback(() => {
    const check = moment.tz.zonesForCountry(props.alpha2);
    if (check) {
      if (check.length === 1) {
        setZone(check[0]);
      } else {
        const res = check.find((el) => (el.indexOf(props.capital) >= 0 ? true : false));
        if (res) {
          setZone(res);
        } else {
          setZone(check[0]);
        }
      }
    } else {
      setZone(props.countryName);
    }
  }, [props]);

  useEffect(() => {
    getZone();
  }, [props]);

  if (zone.length === 0) {
    return <h1>LOADING</h1>;
  }
  return (
    <div className="time-wrapper">
      <Moment tz={zone} format="hh:mm:ss" interval={1000} />
      <Moment tz={zone} format="dddd" locale={i18next.language === 'by' ? 'be' : i18next.language} />
      <Moment tz={zone} format="DD MMMM" locale={i18next.language === 'by' ? 'be' : i18next.language} />
    </div>
  );
};
