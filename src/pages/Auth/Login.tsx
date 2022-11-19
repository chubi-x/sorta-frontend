import { useEffect, useContext, useState } from "react";
import { LoginContext } from "../../helpers/Context";
import { fetchOauth } from "../../api";

import Lottie from "lottie-react";
import login from "../../assets/lotties/login.json";

import { Navbar } from "../../layouts";
import { PrimaryButton } from "../../components/buttons";

export function Login() {
  const [readyToLogin, setReadyToLogin] = useState(false);
  function authLink() {
    const oauth: Oauth = JSON.parse(localStorage.getItem("oauth")!);
    return oauth.url;
  }

  useEffect(() => {
    const abortController = new AbortController();
    const fetchOauthFunction = async () => {
      const responseData = await fetchOauth(abortController);
      if (responseData?.success) {
        localStorage.setItem("oauth", JSON.stringify(responseData?.data));
        setReadyToLogin(true);
      } else {
        alert(responseData?.error);
      }
    };
    fetchOauthFunction();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <Navbar authLink={authLink} loginReady={readyToLogin} />
      <div className="login">
        <div className="login__card">
          <div className="login__card__title">
            <h1>Connect Account</h1>
            <p className="text-xs">
              Hey! Click the button below to connect your twitter account
            </p>
          </div>
          <div className="login__card__animation">
            <Lottie animationData={login} loop={true} autoplay={true} />
          </div>

          {readyToLogin && <PrimaryButton authLink={authLink} />}
        </div>
      </div>
    </>
  );
}

