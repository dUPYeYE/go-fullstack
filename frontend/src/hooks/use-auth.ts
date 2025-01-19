import { useLoginMutation, useLogoutMutation, User } from "@/graphql/types/graphql";
import { useState } from "react";

export function useAuth(getUserInfo: (myToken: string) => void, setToken: (value: string) => void) {
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const [user, setUser] = useState<User | undefined>();

  function logOut() {
    localStorage.removeItem("token");
    logout();
    setUser(undefined);
  }

  async function logIn(email: string, password: string): Promise<boolean | string> {
    try {
      const response: any = await login({
        variables: { email: email, password: password },
      });
      console.log(response);

      if (response?.errors) {
        return response.errors[0].message;
      } else {
        const token = response.data.login;
        setToken(token);
        getUserInfo(token);
        return true;
      }
    } catch (err: any) {
      try {
        console.log(JSON.stringify(err));
        return err.graphQLErrors[0].message;
      } catch {
        return "error";
      }
    }
  }

  return {
    user,
    setUser,
    logIn,
    logOut,
  };
}
