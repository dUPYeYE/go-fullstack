import { useCreateUserMutation, useLoginMutation, useLogoutMutation, User } from "@/graphql/types/graphql";
import { useState } from "react";
import { toast } from "sonner";

export function useAuth(getUserInfo: (myToken: string) => void, setToken: (value: string) => void) {
  const [login] = useLoginMutation();
  const [signup] = useCreateUserMutation();
  const [logout] = useLogoutMutation();
  const [user, setUser] = useState<User | undefined>();

  function logOut() {
    logout();
    setUser(undefined);
    toast.success("Logged out successfully.");
  }

  async function logIn(email: string, password: string): Promise<boolean | string> {
    try {
      const response: any = await login({
        variables: { email: email, password: password },
      });
      window.location.href = "/";

      if (response?.errors) {
        return response.errors[0].message;
      } else {
        const token = response.data.login;
        setToken(token);
        getUserInfo(token);
        toast.success("Logged in successfully.");
        return true;
      }
    } catch (err: any) {
      try {
        console.log(JSON.stringify(err));
        toast.error(err.graphQLErrors[0].message);
        return err.graphQLErrors[0].message;
      } catch {
        return "error";
      }
    }
  }

  async function register(email: string, password: string, username: string): Promise<boolean | string> {
    try {
      await signup({
        variables: { input: { email: email, password: password, name: username } },
      });
      return true;
    } catch (err: any) {
      try {
        console.log(JSON.stringify(err));
        toast.error(err.graphQLErrors[0].message);
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
    register,
  };
}
