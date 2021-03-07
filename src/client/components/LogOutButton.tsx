import React from 'react';
import { useAuth } from '../context/auth.context';
import lang from '../language';
export const LogOutButton: React.FC = () => {
  const { logout } = useAuth();
  return <a onClick={logout}>{lang.logout['en']}</a>;
};
