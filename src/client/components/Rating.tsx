import React, { useState } from 'react';
import { AllRaiting } from './AllRaiting';
import { IImg } from './FotoGallery';
import { Loader } from './Loader';
import { SetRaiting } from './SetRaiting';
interface IProps {
  slide: IImg;
}

export const Raiting: React.FC<IProps> = (props: IProps) => {
  if (!props.slide) {
    return <Loader />;
  }
  const [refreash, setRefreash] = useState(false);
  return (
    <div className="wrapper-raiting">
      <SetRaiting imageId={props.slide._id} setRefreash={setRefreash} />
      <AllRaiting imageId={props.slide._id} refresh={refreash} setRefreash={setRefreash} />
    </div>
  );
};
