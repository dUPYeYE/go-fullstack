import { User } from "@/graphql/types/graphql";
import { createContext } from "react";

export type ContextProviderType = {
  user?: User | undefined;
  setUser: (user: User | undefined) => void;
  accessToken: string | undefined;
  setAccessToken: (token: string | undefined) => void;
  logIn: (email: string, password: string) => Promise<boolean | string>;
  logOut: () => void;
  register: (email: string, password: string, username: string) => Promise<boolean | string>;
  isAppInitialized: boolean;
  initApp: () => Promise<void>;
}

export const Context = createContext<ContextProviderType | undefined>(undefined);
