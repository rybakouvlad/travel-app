import React from 'react';
import { useAuth } from '../context/auth.context';
import { useTranslation } from 'react-i18next';
export const LogOutButton: React.FC = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();
  return <a onClick={logout}>{t('logout')}</a>;
};
