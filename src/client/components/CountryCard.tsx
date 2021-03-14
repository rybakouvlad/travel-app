import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ICountry, useCountry } from '../context/country.context';
import { FotoGallery } from './FotoGallery';
import { ScrollToTop } from './ScrollToTop';
import { Widgets } from './Widgets/Widgets';

interface IParam {
  id: string;
}

export const CountryCard: React.FC = () => {
  const { getCountry, loading } = useCountry();
  const { id } = useParams<IParam>();
  const [country, setCountry] = useState<ICountry>({
    currency: '',
  });
  // console.log('COUNRY', getCountry(id));

  useEffect(() => {
    setCountry(getCountry(id));
  }, [getCountry]);

  if (loading) {
    return <h1>LOADIING</h1>;
  }
  return (
    <>
      <ScrollToTop />
      <Widgets currency={country.currency} countryName={country.name_en} />
      <FotoGallery />
    </>
  );
};
