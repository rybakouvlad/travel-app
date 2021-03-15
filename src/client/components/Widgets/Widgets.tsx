import React from 'react';
import { Currency } from './Cureency';
import { DateWidget } from './DateWidget';
import { Weather } from './Weather';
interface IProps {
  currency: string;
  countryName: string;
  capital_en: string;
  alpha2: string;
}
export const Widgets: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="widgets-wrapper">
      <Currency currency={props.currency} />
      <DateWidget capital={props.capital_en} alpha2={props.alpha2} countryName={props.countryName} />
      <Weather countryName={props.countryName} />
    </div>
  );
};
