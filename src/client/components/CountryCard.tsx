import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ICountry, useCountry } from '../context/country.context';
import { FotoGallery } from './FotoGallery';
import MapCountry from './MapOnSite/MapCountry';
import { ScrollToTop } from './ScrollToTop';
import { Widgets } from './Widgets/Widgets';
import { AboutCountry } from './AboutCountry';
import { VideoComponent } from './VideoComponent';
import { Loader } from './Loader';

interface IParam {
  id: string;
}

export const CountryCard: React.FC = () => {
  const { getCountry, loading } = useCountry();
  const { id } = useParams<IParam>();
  const [country, setCountry] = useState<ICountry>({
    currency: '',
    name_en: '',
    capital_en: '',
    alpha2: '',
  });

  useEffect(() => {
    setCountry(getCountry(id));
  }, [getCountry]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <ScrollToTop />
      <Widgets
        currency={country.currency}
        countryName={country.name_en}
        capital_en={country.capital_en}
        alpha2={country.alpha2}
      />
      <AboutCountry country={country} />
      <FotoGallery alpha2={country.alpha2} />
      <VideoComponent />
      <MapCountry />
    </>
  );
};
