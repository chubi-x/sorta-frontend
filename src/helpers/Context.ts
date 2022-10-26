import React, { createContext } from "react";

interface CallbackParamsInterface {
  callbackParams: CallbackQueryParams | undefined;
  setCallbackParams: React.Dispatch<
    React.SetStateAction<CallbackQueryParams | undefined>
  >;
}
interface OauthInterface {
  oauthData: Oauth | undefined;
  setOauthData: React.Dispatch<React.SetStateAction<Oauth | undefined>>;
}
interface LoginContextInterface {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  callback: CallbackParamsInterface;
  oauth: OauthInterface;
}

export const LoginContext = createContext({} as LoginContextInterface);

