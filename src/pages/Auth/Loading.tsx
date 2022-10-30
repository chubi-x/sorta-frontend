import { completeOauth } from "../../api";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../helpers/Context";
import loading from "../../assets/lotties/loading.json";
import Lottie from "lottie-react";
import { Navbar } from "../../layouts";

export function Loading() {
  const { userContext, loadingContext, oauthContext } =
    useContext(LoginContext);
  const [callbackParams, setCallbackParams] = useState<CallbackQueryParams>(
    JSON.parse(localStorage.getItem("callbackParams")!) || null
  );
  useEffect(() => {
    const abortController = new AbortController();

    const completeOauthFunction = async () => {
      let oauthResponse = await completeOauth(
        callbackParams,
        oauthContext.oauthData,
        abortController
      );
      if (oauthResponse?.success) {
        userContext.setUser((prev) => {
          return { ...prev, isLogged: true };
        });
        loadingContext.setLoading(false);
      }
    };
    completeOauthFunction();
    return () => {
      abortController.abort();
      localStorage.removeItem("callbackParams");
    };
  }, []);
  return (
    <>
      <Navbar loading={loadingContext.loading} />
      <div className="login flex items-center justify-start">
        <div className="login__card flex h-1 justify-center">
          <Lottie
            animationData={loading}
            loop={true}
            autoplay={true}
            style={{ width: "150px" }}
          />
        </div>
      </div>
    </>
  );
}

