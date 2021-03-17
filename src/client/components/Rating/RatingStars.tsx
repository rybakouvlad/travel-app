import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import starEmpty from '../../assets/star_empty.svg';
import starFull from '../../assets/star_full.svg';

interface IProps {
  setRaiting?: Dispatch<SetStateAction<number>>;
  imageId?: string;
  rating?: number;
}

export const RatingStars: React.FC<IProps> = (props: IProps) => {
  const [stars, setStars] = useState([false, false, false, false, false]);

  const clickHandler = (num: number) => {
    const result = [];
    if (num === 1 && stars[0]) {
      setStars([false, false, false, false, false]);
      return;
    }
    for (let i = 0; i < num; i++) {
      result[i] = true;
    }
    props.setRaiting(num);
    setStars(result);
  };

  useEffect(() => {
    setStars([false, false, false, false, false]);
  }, [props.imageId]);

  const setStatic = (number: number) => {
    const result = [];
    for (let i = 0; i < number; i++) {
      result[i] = true;
    }
    setStars(result);
  };

  useEffect(() => {
    setStatic(props.rating);
  }, [props.rating]);

  return (
    <div className="rating-star" style={{ pointerEvents: props.rating ? 'none' : 'auto' }}>
      <img
        onClick={() => {
          clickHandler(1);
        }}
        src={stars[0] ? starFull : starEmpty}
        alt="star"
      />
      <img
        onClick={() => {
          clickHandler(2);
        }}
        src={stars[1] ? starFull : starEmpty}
        alt="star"
      />
      <img
        onClick={() => {
          clickHandler(3);
        }}
        src={stars[2] ? starFull : starEmpty}
        alt="star"
      />
      <img
        onClick={() => {
          clickHandler(4);
        }}
        src={stars[3] ? starFull : starEmpty}
        alt="star"
      />
      <img
        onClick={() => {
          clickHandler(5);
        }}
        src={stars[4] ? starFull : starEmpty}
        alt="star"
      />
    </div>
  );
};
