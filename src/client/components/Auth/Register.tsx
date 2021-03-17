import React, { FC, useState, useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ToastError } from '../Toast/ToastError';
import { useTranslation } from 'react-i18next';

interface ISet {
  changeStatus(status: boolean, isNew: boolean): void;
}

export const Register: FC<ISet> = (props: ISet) => {
  const { t } = useTranslation();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
    login: '',
  });
  const [registeredMessage, setRegisteredMessage] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setRegisteredMessage(error);
    setShow(true);
  }, [error, clearError, setShow]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      if (data.message === 'User was created.') {
        props.changeStatus(true, true);
      }
    } catch (e) {}
  };

  const changeShow = (status: boolean) => {
    setShow(status);
  };

  return (
    <Form>
      <Form.Group controlId="formBasicLogin">
        <Form.Label>{t('login')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('Enter login')}
          name="login"
          value={form.login}
          onChange={changeHandler}
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>{t('Email address')}</Form.Label>
        <Form.Control
          type="email"
          placeholder={t('Email address')}
          name="email"
          value={form.email}
          onChange={changeHandler}
        />
        <Form.Text className="text-dark">{t('never share email')}</Form.Text>
      </Form.Group>
      <Form.Label>{t('Password')}</Form.Label>
      <Form.Group controlId="formBasicPassword">
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id="tooltip-top">{t('Enter more than 6 symbols.')}</Tooltip>}
        >
          <Form.Control
            type="password"
            placeholder={t('Password')}
            name="password"
            value={form.password}
            onChange={changeHandler}
          />
        </OverlayTrigger>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={registerHandler} disabled={loading}>
        {t('Register')}
      </Button>
      {registeredMessage ? (
        <ToastError message={registeredMessage} show={show} changeShow={changeShow} clearError={clearError} />
      ) : null}
    </Form>
  );
};

export default Register;
