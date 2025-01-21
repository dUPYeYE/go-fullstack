import React, { useEffect, useState } from 'react';
import { useMeLazyQuery, useRefreshTokenMutation } from '@/graphql/types/graphql';
import { Context } from './types/context';
import { useAuth } from './hooks/use-auth';

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [isAppInitialized, setIsAppInitialized] = useState<boolean>(false);

  const { logIn, logOut, register, user, setUser } = useAuth(getUserInfo, setAccessToken);

  const [getNewAccessToken] = useRefreshTokenMutation({ fetchPolicy: "no-cache", notifyOnNetworkStatusChange: true });
  const [identifyByToken] = useMeLazyQuery({ fetchPolicy: "no-cache" });

  useEffect(() => {
    if (!user) {
      setAccessToken("");
    }
  }, [user]);

  async function initApp() {
    setIsAppInitialized(false);
    try {
      const token = await getNewAccessToken();
      if (token.data) {
        setAccessToken(token.data.refreshToken);
        await getUserInfo(token.data.refreshToken);
      }
      console.log(token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAppInitialized(true);
    }
  }

  async function getUserInfo (myToken: string) {
    const userInfo = await identifyByToken({
      fetchPolicy: "no-cache",
      context: {
        headers: {
          authorization: `Bearer ${myToken}`,
        },
      },
    });

    if (userInfo.data) {
      setUser(userInfo.data.me);
      console.log(userInfo.data.me);
      setAccessToken(myToken);
    }
  }

  return (
    <Context.Provider value={{
      user,
      setUser,
      accessToken,
      setAccessToken,
      logIn,
      logOut,
      register,
      isAppInitialized,
      initApp
    }}>
      {children}
    </Context.Provider>
  );
};
