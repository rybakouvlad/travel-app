import React, { useState } from 'react';
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
  const [refreash, setRefreash] = useState(false);
  return (
    <div className="wrapper-raiting">
      <SetRaiting imageId={props.slide._id} setRefreash={setRefreash} />
      <AllRaiting imageId={props.slide._id} refresh={refreash} setRefreash={setRefreash} />
    </div>
  );
};
