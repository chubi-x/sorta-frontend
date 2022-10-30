import { useState, useEffect } from "react";
import { LoginContext } from "./helpers/Context";
import { Routes, Route } from "react-router-dom";
import { Loading, Login, OauthCallback } from "./pages/Auth";
import { Dashboard } from "./pages/User";
import "./assets/styles/App.css";

function App() {
  const [oauthData, setOauthData] = useState<Oauth>();
  const [callbackParams, setCallbackParams] = useState<CallbackQueryParams>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user")!) || { isLogged: false }
  );

  function readCallbackMessage(event: StorageEvent) {
    setLoading(true);
  }
  useEffect(() => {
    window.addEventListener("storage", readCallbackMessage);
    return () => {
      window.removeEventListener("storage", readCallbackMessage);
    };
  }, []);

  // logic to set root element
  let root: JSX.Element = <></>;
  // if (user.isLogged) {
  //   root = <Dashboard />;
  // }
  if (loading) {
    root = <Loading />;
  } else if (!user.isLogged) {
    root = <Login />;
  }
  return (
    <LoginContext.Provider
      value={{
        user,
        setUser,
        setLoading,
        oauth: { oauthData, setOauthData },
        callback: { callbackParams, setCallbackParams },
      }}
    >
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

