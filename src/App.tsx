import { useState, useEffect } from "react";
import { LoginContext } from "./helpers/Context";
import { Routes, Route } from "react-router-dom";
import { Loading, Login, OauthCallback } from "./pages/Auth";
import { Dashboard } from "./pages/User";
import "./assets/styles/App.css";

function App() {
  const [oauthData, setOauthData] = useState<Oauth>();
  const [callbackParams, setCallbackParams] = useState<CallbackQueryParams>();
  const [loading, setLoading] = useState(false);
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
  let root: JSX.Element = <Login />;
  if (user.isLogged) {
    root = <Dashboard />;
  } else if (loading) {
    root = <Loading />;
  }

  return (
    <LoginContext.Provider
      value={{
        userContext: { user, setUser },
        loadingContext: { loading, setLoading },
        oauthContext: { oauthData, setOauthData },
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

