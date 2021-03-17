import React, { FC, useState } from 'react';
import { Badge, NavLink } from 'react-bootstrap';
import Authorization from './Authorization';
import Register from './Register';
import { ToastCopmponent } from '../ToastCopmponent';
import { useTranslation } from 'react-i18next';
export const Auth: FC = () => {
  const { t } = useTranslation();
  const [textHelp, setTextHelp] = useState({
    isStatus: false,
  });
  const [showToast, setShowToast] = useState(false);
  const changeHandler = () => {
    changeStatus(textHelp.isStatus);
  };

  const changeStatus = (status: boolean, isNew = false): void => {
    if (isNew) {
      setShowToast(true);
    }
    if (status) {
      setTextHelp({
        isStatus: false,
      });
    } else {
      setTextHelp({
        isStatus: true,
      });
    }
  };

  const changeShow = (status: boolean) => {
    setShowToast(status);
  };

  return (
    <div className="login-form-wrapper">
      {textHelp.isStatus ? <Register changeStatus={changeStatus} /> : <Authorization />}

      <h6>
        {textHelp.isStatus ? t('Do you have') : t('You are not')}{' '}
        <Badge as={NavLink} variant="dark" onClick={changeHandler}>
          {textHelp.isStatus ? t('a registration?') : t('registred?')}
        </Badge>
      </h6>

      {showToast ? <ToastCopmponent show={showToast} message={t('User was created.')} changeShow={changeShow} /> : null}
    </div>
  );
};

export default Auth;
