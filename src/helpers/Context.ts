import React, { createContext } from "react";
interface LoginContextInterface {
  isLogged: boolean;
  user: User | undefined;
  oauthData: Oauth | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const LoginContext = createContext({} as LoginContextInterface);
