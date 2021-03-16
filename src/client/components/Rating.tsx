import React from 'react';
import { AllRaiting } from './AllRaiting';
import { IImg } from './FotoGallery';
import { SetRaiting } from './SetRaiting';
interface IProps {
  slide: IImg;
}

export const Raiting: React.FC<IProps> = (props: IProps) => {
  if (!props.slide) {
    return <h1>Loading</h1>;
  }
  console.log('RAITING', props.slide._id);
  return (
    <div className="wrapper-raiting">
      <SetRaiting imageId={props.slide._id} />
      <AllRaiting imageId={props.slide._id} />
    </div>
  );
};
