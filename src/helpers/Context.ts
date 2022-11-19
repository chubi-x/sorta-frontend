import React, { createContext } from "react";

interface CallbackParamsContext {
  callbackParams: CallbackQueryParams | undefined;
  setCallbackParams: React.Dispatch<
    React.SetStateAction<CallbackQueryParams | undefined>
  >;
}
interface OauthContext {
  oauthData: Oauth | undefined;
  setOauthData: React.Dispatch<React.SetStateAction<Oauth | undefined>>;
}

interface LoadingContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserContext {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
interface LoginContextInterface {
  // userContext: UserContext;
  loadingContext: LoadingContext;
  oauthContext: OauthContext;
}

export const LoginContext = createContext({} as LoginContextInterface);

