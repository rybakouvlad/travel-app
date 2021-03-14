import React, { useCallback, useEffect, useState } from 'react';

interface IProps {
  currency: string;
}

export const Currency: React.FC<IProps> = (props: IProps) => {
  const [usd, setUsd] = useState();

  const getCurrents = useCallback(async () => {
    try {
      const usd = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=3e9d324dfcf34b379733e7186080f1d6&base=USD&symbols=${props.currency}`,
      );
      const result = await usd.json();
      setUsd(result.rates[props.currency]);
    } catch (error) {}
  }, [props.currency]);

  useEffect(() => {
    getCurrents();
  }, [props.currency]);

  return (
    <div>
      <h1>
        {props.currency}: {usd} USD{' '}
      </h1>
    </div>
  );
};
