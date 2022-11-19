import { useState, useEffect } from "react";
import { LoginContext } from "./helpers/Context";
import { Routes, Route } from "react-router-dom";
import { Login, OauthCallback } from "./pages/Auth";
import { Dashboard } from "./pages/User";
import "./assets/styles/App.css";

function App() {
  const [oauthData, setOauthData] = useState<Oauth>();
  const [loading, setLoading] = useState(false);
  // localStorage.clear();
  function readCallbackMessage() {
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

  return (
    <LoginContext.Provider
      value={{
        // userContext: { user, setUser },
        loadingContext: { loading, setLoading },
        oauthContext: { oauthData, setOauthData },
      }}
    >
      <div className="app">
        <Routes>
          <Route path="/" element={root} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/oauth/callback/:query" element={<OauthCallback />} />
        </Routes>
      </div>
    </LoginContext.Provider>
  );
}

export default App;

