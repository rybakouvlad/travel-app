import React from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

interface IParam {
  id: string;
}

export const VideoComponent: React.FC = () => {
  const { id } = useParams<IParam>();
  const { t } = useTranslation();
  return (
    <div>
      <h4 className="video-text">{t('Video')}</h4>
      <div className="video-wrapper">
        <ReactPlayer
          className="player"
          light={`${process.env.PATH_LOCAL}/assets/county/main/${id}.jpg`}
          controls={true}
          url={`${process.env.PATH_LOCAL}/video/${id}.mp4`}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};
