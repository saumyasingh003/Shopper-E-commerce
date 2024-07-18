import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
