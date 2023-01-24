// LIBRARIES
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { parse } from "qs";
import Lottie from "lottie-react";

// APIS
import { completeOauth } from "../../api";

// LAYOUTS
import { Navbar } from "../../layouts";

// COMPONENTS
import { LoginCard } from "../../components/cards";

// ASSETS
import loadingAnimation from "../../assets/animations/loading.json";
import { toast } from "react-toastify";

type Props = {
  login: () => void;
};
export function OauthCallback({ login }: Props) {
  const params = useLocation();
  const navigate = useNavigate();
  const errorMessage = (message: string) => toast.error(message, { position: "bottom-right" });

  useEffect(() => {
    const oauth: Oauth = JSON.parse(localStorage.getItem("oauth")!);

    const abortController = new AbortController();

    const queryString = parse(params.search, { ignoreQueryPrefix: true });
    const callbackParams = queryString as unknown as CallbackQueryParams;
    const completeOauthFunction = async () => {
      const oauthResponse = await completeOauth(callbackParams, oauth, abortController);
      if (oauthResponse?.success) {
        login();
        navigate("/dashboard");
      } else {
        if (oauthResponse?.message) errorMessage(oauthResponse.error!);
        navigate("/login");
      }
    };
    completeOauthFunction();
    return () => {
      abortController.abort();
      localStorage.removeItem("callbackParams");
      localStorage.removeItem("oauth");
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="login">
        <LoginCard>
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            autoplay={true}
            style={{ width: "100px" }}
          />
        </LoginCard>
      </div>
    </>
  );
}
