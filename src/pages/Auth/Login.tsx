import { useEffect, useState } from "react";
import { fetchOauth } from "../../api";

import Lottie from "lottie-react";
import login from "../../assets/lotties/login.json";

import { Navbar } from "../../layouts";
import { PrimaryButton } from "../../components/buttons";
import { LoginCard } from "../../components/cards";

export function Login() {
  const [readyToLogin, setReadyToLogin] = useState(false);

  const authLink = () => {
    const oauth: Oauth = JSON.parse(localStorage.getItem("oauth")!);
    return oauth.url;
  };

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
        <LoginCard>
          <div className="login__card__title">
            <h1>Connect Account</h1>
            <p className="text-xs">
              Hey! Click the button below to connect your twitter account
            </p>
          </div>
          <div className="login__card__animation">
            <Lottie animationData={login} loop={true} autoplay={true} />
          </div>

          <PrimaryButton authLink={authLink} loginReady={readyToLogin} />
        </LoginCard>
      </div>
    </>
  );
}

