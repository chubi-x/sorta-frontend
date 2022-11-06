import { useEffect, useContext } from "react";
import { LoginContext } from "../../helpers/Context";
import { fetchOauth } from "../../api";

import Lottie from "lottie-react";
import login from "../../assets/lotties/login.json";

import { Navbar } from "../../layouts";
import { PrimaryButton } from "../../components/buttons";

export function Login() {
  const { oauthContext, loadingContext } = useContext(LoginContext);

  function authFunction() {
    window.open(oauthContext.oauthData?.url, "", "width=700;height=700")!;
  }

  // Begin oauth process
  useEffect(() => {
    const abortController = new AbortController();
    const fetchOauthFunction = async () => {
      const responseData = await fetchOauth(abortController);
      console.log(responseData);
      if (responseData?.success) {
        oauthContext.setOauthData(() => responseData?.data);
      } else {
        console.log("error fetching oauth\n");
        console.log(responseData);
      }
    };
    fetchOauthFunction();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <Navbar authFunction={authFunction} />
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

          <PrimaryButton authFunction={authFunction} />
        </div>
      </div>
    </>
  );
}

