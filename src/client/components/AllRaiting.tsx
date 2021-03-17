import React, { useEffect, useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { useHttp } from '../hooks/http.hook';
import { RatingStars } from './RatingStars';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { Loader } from './Loader';

interface IProps {
  imageId: string;
  refresh: boolean;
  setRefreash: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IUser {
  filepath: string;
  login: string;
}

export interface IRaiting {
  rating?: number;
  comment?: string;
  user: IUser;
  createdAt: Date;
}

export const AllRaiting: React.FC<IProps> = (props: IProps) => {
  const [comments, setComments] = useState<IRaiting[]>();
  const { t } = useTranslation();
  const { request, loading } = useHttp();
  const getComments = async () => {
    try {
      const data = await request('/api/raiting/getAll', 'POST', { imageId: props.imageId });
      setComments(data);
      if (props.refresh) {
        props.setRefreash(false);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getComments();
  }, [props.imageId, props.refresh]);

  if (loading || !props.imageId || !comments) {
    return <Loader />;
  }

  return (
    <div className="all-rating-wrapper">
      {comments.length === 0 ? (
        <h2>{t('No comments and ratings')}</h2>
      ) : (
        comments.map((el, index) => {
          return (
            <Card className="all-rating" key={index} text="white">
              <Card.Header className="card-raiting">
                <div className="card-ratting-login">
                  <Image
                    className="img-out"
                    src={`http://127.0.0.1:3333/assets/users/${el.user.filepath}`}
                    roundedCircle
                  />
                  <span>{el.user.login} </span>
                </div>

                <div className="card-raiting">
                  {new Date(el.createdAt).toLocaleString(i18next.language === 'by' ? 'be' : i18next.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </Card.Header>
              <Card.Body>
                <RatingStars rating={el.rating} />
              </Card.Body>
              <Card.Footer>
                <blockquote className="blockquote mb-0">
                  <p> {el.comment} </p>
                </blockquote>
              </Card.Footer>
            </Card>
          );
        })
      )}
    </div>
  );
};
