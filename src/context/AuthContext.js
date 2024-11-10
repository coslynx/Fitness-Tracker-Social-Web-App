import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };