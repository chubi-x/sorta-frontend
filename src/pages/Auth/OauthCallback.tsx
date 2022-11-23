// LIBRARIES
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../helpers/Context";
import { parse } from "qs";
import Lottie from "lottie-react";

// APIS
import { completeOauth } from "../../api";

// LAYOUTS
import { Navbar } from "../../layouts";

// COMPONENTS
import { LoginCard } from "../../components/cards";

// ASSETS
import loadingAnimation from "../../assets/lotties/loading.json";

export function OauthCallback() {
  const params = useLocation();
  const navigate = useNavigate();
  const { loadingContext } = useContext(LoginContext);

  useEffect(() => {
    const oauth: Oauth = JSON.parse(localStorage.getItem("oauth")!);

    const abortController = new AbortController();

    const queryString = parse(params.search, { ignoreQueryPrefix: true });
    const callbackParams = queryString as unknown as CallbackQueryParams;
    const completeOauthFunction = async () => {
      const oauthResponse = await completeOauth(
        callbackParams,
        oauth,
        abortController
      );
      if (oauthResponse?.success) {
        navigate("/dashboard");
      } else {
        alert(oauthResponse?.error);
        navigate("/login");
      }
    };
    completeOauthFunction();
    return () => {
      abortController.abort();
      localStorage.removeItem("callbackParams");
      // localStorage.removeItem("oauth");
    };
  }, []);

  return (
    <>
      <Navbar loading={loadingContext.loading} />
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

