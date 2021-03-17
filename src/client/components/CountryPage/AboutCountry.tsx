import React from 'react';
import { useParams } from 'react-router';
import i18next from 'i18next';

interface IProps {
  country: any;
}

interface IParam {
  id: string;
}

export const AboutCountry: React.FC<IProps> = ({ country }: IProps) => {
  const { id } = useParams<IParam>();
  return (
    <div className="about-wrapper">
      <div className="country-title">
        <span>{country[`name_${i18next.language}`]}</span>
        <span>{country[`capital_${i18next.language}`]}</span>
      </div>
      <img src={`${process.env.PATH_LOCAL}/assets/county/main/${id}.jpg`} alt="" />
      <p className="about-country-description">{country[`description_${i18next.language}`]}</p>
    </div>
  );
};
