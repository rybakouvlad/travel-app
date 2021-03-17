import React, { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useAuth } from '../../context/auth.context';
import { useHttp } from '../../hooks/http.hook';
import { RatingStars } from './RatingStars';
import { useTranslation } from 'react-i18next';

interface IProps {
  imageId: string;
  setRefreash: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SetRaiting: React.FC<IProps> = (props: IProps) => {
  const { token } = useAuth();
  const { request } = useHttp();
  const { t } = useTranslation();
  const [raiting, setRaiting] = useState(null);
  const [form, setForm] = useState({
    comment: '',
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const addCommentHandler = async () => {
    if (!form.comment && !raiting) {
      return;
    }
    try {
      await request(
        '/api/raiting/set',
        'POST',
        { ...form, raiting: raiting, imageId: props.imageId },
        { Authorization: `Bearer ${token}` },
      );
      props.setRefreash(true);
      setForm({ comment: '' });
      setRaiting(null);
    } catch (e) {}
  };
  return (
    <div>
      {token ? (
        <div className="raiting-set-wrapper">
          <RatingStars setRaiting={setRaiting} imageId={props.imageId} />
          <div className="rating-input">
            <InputGroup className="mb-3" style={{ marginTop: '1%' }}>
              <FormControl
                onChange={changeHandler}
                value={form.comment}
                name="comment"
                placeholder={t('Your comment')}
                aria-label="Your comment"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="dark" type="submit" onClick={addCommentHandler}>
                  {t('Add')}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
      ) : null}
    </div>
  );
};
