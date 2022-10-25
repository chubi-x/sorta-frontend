import { Loading, Login, OauthCallback } from "./pages/Auth";
import { Dashboard } from "./pages/User";
import { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { completeOauth, fetchOauth } from "./api";
// import {  } from "./api";

import { LoginContext } from "./helpers/Context";

import "./assets/styles/App.css";

function App() {
  const [oauthData, setOauthData] = useState<Oauth>();
  const [callbackParams, setCallbackParams] = useState<CallbackQueryParams>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user")!) || { isLogged: false }
  );
  
  function readCallbackMessage(event: StorageEvent) {
    const callbackParams: CallbackQueryParams = JSON.parse(
      localStorage.getItem("callbackParams")!
    );
    setCallbackParams(callbackParams);
  }

  function authFunction() {
    window.open(oauthData?.url, "", "width=700;height=700")!;
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchOauth(abortController, setOauthData);
    window.addEventListener("storage", readCallbackMessage);
    return () => {
      abortController.abort();
      window.removeEventListener("storage", readCallbackMessage);
    };
  }, []);

  // effect to complete sign in process
  useEffect(() => {
    const abortController = new AbortController();
    const oauthCompleteFunction = async function () {
      if (callbackParams?.state) {
        setLoading(true);
        const oauthResponse: ServerResponse = await completeOauth(
          callbackParams,
          oauthData,
          abortController
        );
        if (oauthResponse.success) {
          setLoading(false);
          setUser((prev) => {
            return { ...prev, isLogged: true };
          });
        } else {
          setLoading(false);
          alert(oauthResponse.error);
          // console.log();
        }
      }
      if (callbackParams?.error) {
        alert(callbackParams?.error);
      }
    };
    if (oauthData && callbackParams) {
      oauthCompleteFunction();
    }
    return () => {
      abortController.abort();
    };
  }, [callbackParams]);

  // logic to set root element
  let root: JSX.Element = <></>;
  if (user.isLogged) {
    root = <Dashboard />;
  } else if (loading) {
    root = <Loading />;
  } else if (!user.isLogged) {
    root = <Login authFunction={authFunction} />;
  }
  //  root = isLogged ? <User /> : <Login authFunction={authFunction} />;
  return (
    <LoginContext.Provider value={{ user, setUser, oauthData }}>
      <div className="app">
        <Routes>
          <Route path="/" element={root} />
          <Route path="/oauth/callback/:query" element={<OauthCallback />} />
        </Routes>
      </div>
    </LoginContext.Provider>
  );
}

export default App;

