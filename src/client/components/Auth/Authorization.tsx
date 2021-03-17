import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.context';
import { useHttp } from '../../hooks/http.hook';
import { Button, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ToastError } from '../ToastError';
import { useTranslation } from 'react-i18next';
export const Authorization: React.FC = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const history = useHistory();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
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

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      login(data.token, data.userId);
      if (data.status) {
        history.push('/');
      }
    } catch (e) {}
  };

  const changeShow = (status: boolean) => {
    setShow(status);
  };
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>{t('Email address')}</Form.Label>
        <Form.Control
          type="email"
          placeholder={t('Email address')}
          name="email"
          value={form.email}
          onChange={changeHandler}
        />
        <Form.Text className="text-dark">{t(t('never share email'))}</Form.Text>
      </Form.Group>
      <Form.Label>{t('Password')}</Form.Label>
      <Form.Group controlId="formBasicPassword">
        <OverlayTrigger
          key="top"
          placement="top"
          overlay={<Tooltip id="tooltip-top">{t(t('never share email'))}</Tooltip>}
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

      <Button variant="primary" type="submit" onClick={loginHandler} disabled={loading}>
        {t('login')}
      </Button>
      {registeredMessage ? (
        <ToastError message={registeredMessage} show={show} changeShow={changeShow} clearError={clearError} />
      ) : null}
    </Form>
  );
};

export default Authorization;
