import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/auth.context';
import { useTranslation } from 'react-i18next';
import { OverlayTrigger, Popover, Image } from 'react-bootstrap';
import { ModalDonwloadImg } from './ModalDonwloadImg';
import { useHttp } from '../hooks/http.hook';

export const LogOutButton: React.FC = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { request } = useHttp();
  const { token } = useAuth();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const [path, setPath] = useState('new_user.png');
  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        <p onClick={logout}>{t('logout')}</p>
        <p onClick={() => setModalShow(true)}>Profile</p>
      </Popover.Content>
    </Popover>
  );

  const getPathImg = useCallback(async () => {
    try {
      const data = await request('/api/auth/getImg', 'POST', null, { Authorization: `Bearer ${token}` });
      if (data) {
        setPath(data);
      }
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    getPathImg();
  }, [getPathImg]);

  return (
    <>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Image className="img-out" src={`http://127.0.0.1:3333/assets/users/${path}`} roundedCircle />
      </OverlayTrigger>
      <ModalDonwloadImg show={modalShow} onHide={setModalShow} />
    </>
  );
};
