import React from 'react';

import i18next from 'i18next';

interface IProps {
  country: any;
}

export const AboutCountry: React.FC<IProps> = ({ country }: IProps) => {
  return (
    <div>
      <h2>{country[`name_${i18next.language}`]}</h2>
      <h3>{country[`capital_${i18next.language}`]}</h3>
      <p>{country[`description_${i18next.language}`]}</p>
    </div>
  );
};
