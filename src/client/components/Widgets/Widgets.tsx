import React from 'react';
import { Currency } from './Cureent';
interface IProps {
  currency: string;
}
export const Widgets: React.FC<IProps> = (props: IProps) => {
  return (
    <div>
      <Currency currency={props.currency} />
      <h1>2</h1>
    </div>
  );
};
