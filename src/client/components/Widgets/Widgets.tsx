import React from 'react';
import { Currency } from './Cureent';
import { Weather } from './Weather';
interface IProps {
  currency: string;
  countryName: string;
}
export const Widgets: React.FC<IProps> = (props: IProps) => {
  return (
    <div>
      <Currency currency={props.currency} />
      <Weather countryName={props.countryName} />
      <h1>2</h1>
    </div>
  );
};
