import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem('credentials');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (creds) => {
    setCredentials(creds);
    localStorage.setItem('credentials', JSON.stringify(creds));
  };

  const logout = () => {
    setCredentials(null);
    localStorage.removeItem('credentials');
  };

  return (
    <AuthContext.Provider value={{ credentials, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
