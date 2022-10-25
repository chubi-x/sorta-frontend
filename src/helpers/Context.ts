import React, { createContext } from "react";
interface LoginContextInterface {
  user: User;
  oauthData: Oauth | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const LoginContext = createContext({} as LoginContextInterface);

