import { parse } from "qs";
import { useLocation } from "react-router-dom";

export function OauthCallback() {
  const params = useLocation();
  const queryString = parse(params.search, { ignoreQueryPrefix: true });
  localStorage.setItem("callbackParams", JSON.stringify(queryString));
  self.close();
  return <h1>Login successful! You can close this window.</h1>;
}

