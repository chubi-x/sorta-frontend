import { fetchOauth } from "../../api";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../helpers/Context";

import Lottie from "lottie-react";
import login from "../../assets/lotties/login.json";

import { Navbar } from "../../layouts/Navbar";
import { PrimaryButton } from "../../components/buttons";

export function Login() {
  const { setLoading, callback, oauth } = useContext(LoginContext);

  function authFunction() {
    window.open(oauth.oauthData?.url, "", "width=700;height=700")!;
  }

  function readCallbackMessage(event: StorageEvent) {
    const callbackParams: CallbackQueryParams = JSON.parse(
      localStorage.getItem("callbackParams")!
    );
    callback.setCallbackParams(callbackParams);
    localStorage.removeItem("callbackParams");
  }
  // Begin oauth process
  useEffect(() => {
    const abortController = new AbortController();
    fetchOauth(abortController, oauth.setOauthData);
    window.addEventListener("storage", readCallbackMessage);
    return () => {
      abortController.abort();
      window.removeEventListener("storage", readCallbackMessage);
    };
  }, []);

  // effect to complete sign in process
  useEffect(() => {
    if (callback.callbackParams?.state) {
      setLoading(true);
    }
    if (callback.callbackParams?.error) {
      alert(callback.callbackParams?.error);
    }

    return () => {};
  }, [callback.callbackParams]);
  return (
    <>
      <Navbar authFunction={authFunction} />
      <div className="login">
        <div className="login__card">
          <div className="login__card__title">
            <h1>Connect Account</h1>
            <p>Hey! Click the button below to connect your twitter account</p>
          </div>
          <Lottie animationData={login} loop={true} autoplay={true} />

          <PrimaryButton authFunction={authFunction} />
        </div>
      </div>
    </>
  );
}

