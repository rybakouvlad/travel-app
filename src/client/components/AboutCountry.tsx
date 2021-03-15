import React from 'react';

import i18next from 'i18next';

interface IProps {
  country: any;
}

export const AboutCountry: React.FC<IProps> = ({ country }: IProps) => {
  return (
    <div className="about-wrapper">
      <div className="country-title">
        <span>{country[`name_${i18next.language}`]}</span>
        <span>{country[`capital_${i18next.language}`]}</span>
      </div>
      <p className="about-country-description">{country[`description_${i18next.language}`]}</p>
    </div>
  );
};
