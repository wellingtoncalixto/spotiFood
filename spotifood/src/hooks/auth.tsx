import React, { createContext, useCallback, useState, useContext } from 'react';

interface AuthContextData {
  saveToken(token: string, refresh_token: string): Promise<void>;
  token: string;
  refresh_token: string;
}

interface AuthState {
  token: string;
  refresh_token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@spotifood:token');
    const refresh_token = localStorage.getItem('@spotifood:refresh_token');

    if (token && refresh_token) {
      return { token, refresh_token };
    }

    return {} as AuthState;
  });

  const saveToken = useCallback(async (token, refresh_token) => {
    localStorage.removeItem('@spotifood:token');
    localStorage.removeItem('@spotifood:refresh_token');
    localStorage.setItem('@spotifood:token', token);
    localStorage.setItem('@spotifood:refresh_token', refresh_token);

    setData({ token, refresh_token });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        saveToken,
        refresh_token: data.refresh_token,
        token: data.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
