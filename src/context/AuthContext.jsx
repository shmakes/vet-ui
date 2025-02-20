import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse.access_token);
      // Fetch user info using the access token
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
        .then(res => res.json())
        .then(userInfo => setUser(userInfo));
    },
    scope: 'openid email profile',
  });

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 