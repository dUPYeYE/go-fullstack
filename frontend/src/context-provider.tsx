import React, { useEffect, useState } from 'react';
import { useMeLazyQuery, useRefreshTokenMutation } from '@/graphql/types/graphql';
import { Context } from './types/context';
import { useAuth } from './hooks/use-auth';

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const { logIn, logOut, user, setUser } = useAuth(getUserInfo, setAccessToken);

  const [getNewAccessToken] = useRefreshTokenMutation({ fetchPolicy: "no-cache", notifyOnNetworkStatusChange: true });
  const [identifyByToken] = useMeLazyQuery({ fetchPolicy: "no-cache" });

  useEffect(() => {
    if (!user) {
      setAccessToken("");
    }
  }, [user]);

  const handleRefreshToken = async () => {
    const { data } = await getNewAccessToken();
    setAccessToken(data?.refreshToken);
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
      setAccessToken(myToken);
    }
  }

  return (
    <Context.Provider value={{ user, setUser, accessToken, setAccessToken, logIn, logOut }}>
      {children}
    </Context.Provider>
  );
};
