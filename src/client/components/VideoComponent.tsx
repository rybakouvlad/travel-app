import React from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';

interface IParam {
  id: string;
}

export const VideoComponent: React.FC = () => {
  const { id } = useParams<IParam>();

  return (
    <div className="video-wrapper">
      <ReactPlayer
        className="player"
        light={`http://127.0.0.1:3333/assets/county/main/${id}.jpg`}
        controls={true}
        url={`http://127.0.0.1:3333/video/${id}.mp4`}
        width="100%"
        height="100%"
      />
    </div>
  );
};
