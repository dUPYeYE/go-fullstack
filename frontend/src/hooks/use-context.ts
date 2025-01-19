import { Context, ContextProviderType } from "@/types/context";
import { useContext } from "react";

export const useAppContext = (): ContextProviderType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};
