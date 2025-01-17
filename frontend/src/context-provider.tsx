import React, { createContext, useContext, useState } from 'react';
import { User, useRefreshTokenMutation } from '@/graphql/types/graphql';

interface ContextProviderType {
  user?: User | undefined;
  setUser: (user: User | undefined) => void;
  refreshToken: string | undefined;
  setRefreshToken: (token: string | undefined) => void;
}

const Context = createContext<ContextProviderType | undefined>(undefined);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined);

  const [getNewAccessToken] = useRefreshTokenMutation({ fetchPolicy: "no-cache", notifyOnNetworkStatusChange: true });

  return (
    <Context.Provider value={{ user, setUser, refreshToken, setRefreshToken }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = (): ContextProviderType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};
