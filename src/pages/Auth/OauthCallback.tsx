import { useEffect, useContext } from "react";
import { parse } from "qs";
import { useLocation } from "react-router-dom";
import { LoginContext } from "../../helpers/Context";
import { dom } from "@fortawesome/fontawesome-svg-core";

export function OauthCallback() {
  const params = useLocation();
  const queryString = parse(params.search, { ignoreQueryPrefix: true });

  localStorage.setItem("callbackParams", JSON.stringify(queryString));
  // console.log(window.opener);
  // self.close();
  return <h1>Login successful! You can close this window.</h1>;
}
