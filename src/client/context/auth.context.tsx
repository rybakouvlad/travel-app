import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const storageName = 'userData';

interface IUseHook {
  login(jwtToken: string, id: string): void;
  logout(): void;
  token: string;
  userId: string;
  ready: boolean;
}

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IUseHook>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }: IProps) => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId);
    }
    setReady(true);
  }, [login]);
  return <AuthContext.Provider value={{ login, logout, token, userId, ready }}> {children} </AuthContext.Provider>;
};
