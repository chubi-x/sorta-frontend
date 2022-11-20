import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { parse } from "qs";

import { LoginContext } from "../../helpers/Context";
import { Navbar } from "../../layouts";
import { completeOauth } from "../../api";
import { LoginCard } from "../../components/cards";

import loadingAnimation from "../../assets/lotties/loading.json";
import Lottie from "lottie-react";

export function OauthCallback() {
  const params = useLocation();
  const navigate = useNavigate();
  const { loadingContext } = useContext(LoginContext);
  const oauth: Oauth = JSON.parse(localStorage.getItem("oauth")!);

  useEffect(() => {
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
        // alert(oauthResponse?.error);
        // navigate("/login");
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
            style={{ width: "150px" }}
          />
        </LoginCard>
      </div>
    </>
  );
}

