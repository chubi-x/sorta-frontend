// LIBRARIES
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

// API
import { fetchOauth } from "../../api";
//LAYOUTS
import { Navbar } from "../../layouts";

// COMPONENTS
import { PrimaryButton } from "../../components/buttons";
import { LoginCard } from "../../components/cards";

// ASSETS
import loginLottie from "../../assets/animations/login.json";
import { toast } from "react-toastify";
export function Login() {
  const [readyToLogin, setReadyToLogin] = useState(false);

  const authLink = () => {
    const oauth: Oauth = JSON.parse(localStorage.getItem("oauth")!);
    return oauth?.url;
  };
  const successMessage = () => toast.success("Ready to login!", { position: "bottom-right" });

  useEffect(() => {
    const abortController = new AbortController();
    const fetchOauthFunction = async () => {
      const responseData = await fetchOauth(abortController);
      if (responseData?.success) {
        localStorage.setItem("oauth", JSON.stringify(responseData?.data));
        setReadyToLogin(true);
        successMessage();
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
            <p className="text-xs">Hey! Click the button below to connect your twitter account</p>
          </div>
          <div className="login__card__animation">
            <Lottie animationData={loginLottie} loop={true} autoplay={true} />
          </div>

          <PrimaryButton authLink={authLink} loginReady={readyToLogin} />
        </LoginCard>
      </div>
    </>
  );
}
