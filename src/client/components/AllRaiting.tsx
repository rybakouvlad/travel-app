import React, { useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';

interface IProps {
  imageId: string;
}

export interface IRaiting {
  raiting?: number;
  comment?: string;
}

export const AllRaiting: React.FC<IProps> = (props: IProps) => {
  const [comments, setComments] = useState<IRaiting>();

  const { request } = useHttp();
  const getComments = async () => {
    try {
      const data = await request('/api/raiting/getAll', 'POST', { imageId: props.imageId });
      console.log('!!!!!', data);
      setComments(data);
      console.log(comments);
    } catch (e) {}
  };

  useEffect(() => {
    getComments();
  }, [props.imageId]);

  return <h1>Hello</h1>;
};
