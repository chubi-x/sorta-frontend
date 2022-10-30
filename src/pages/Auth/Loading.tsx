import { completeOauth } from "../../api";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../helpers/Context";
import loading from "../../assets/lotties/loading.json";
import Lottie from "lottie-react";

export function Loading() {
  const { setUser, setLoading, oauth } = useContext(LoginContext);
  const [callbackParams, setCallbackParams] = useState<CallbackQueryParams>(
    JSON.parse(localStorage.getItem("callbackParams")!)
  );
  useEffect(() => {
    const abortController = new AbortController();

    const completeOauthFunction = async () => {
      let oauthResponse = await completeOauth(
        callbackParams,
        oauth.oauthData,
        abortController
      );
      if (oauthResponse?.success) {
        setUser((prev) => {
          return { ...prev, isLogged: true };
        });
        setLoading(false);
      }
    };
    completeOauthFunction();
    return () => {
      abortController.abort();
      localStorage.removeItem("callbackParams");
    };
  }, []);
  return (
    <div className="mx-auto flex h-full w-full items-center justify-center bg-neutral-6">
      <Lottie
        animationData={loading}
        loop={true}
        autoplay={true}
        style={{ width: "200px" }}
      />
    </div>
  );
}

