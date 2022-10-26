import loading from "../../assets/lotties/loading.json";
import Lottie from "lottie-react";
import { completeOauth } from "../../api";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../helpers/Context";

export function Loading() {
  const { setUser, setLoading, callback, oauth } = useContext(LoginContext);

  useEffect(() => {
    const abortController = new AbortController();
    const completeOauthFunction = async () => {
      const oauthResponse: ServerResponse = await completeOauth(
        callback.callbackParams,
        oauth.oauthData,
        abortController
      );
      if (oauthResponse.success) {
        setUser((prev) => {
          return { ...prev, isLogged: true };
        });
        setLoading(false);
      } else {
        // alert("from loading" + oauthResponse.error);
        // setLoading(false);
      }
    };
    if (callback.callbackParams && oauth.oauthData) {
      completeOauthFunction();
    }
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

