// LIBRARIES
import { useReducer } from "react";
import { ActiveContext } from "./helpers/Context";
import { activeTabReducer } from "./helpers/Reducer";

import { Routes, Route } from "react-router-dom";
// PAGES
import { Login, OauthCallback } from "./pages/Auth";
import { Dashboard } from "./pages/User";
import { Category } from "./pages/Categories";

// ASSETS
import "./assets/styles/App.css";

function App() {
  const [activeTabState, dispatchActiveTabState] = useReducer(
    activeTabReducer,
    { bookmarksActive: true, categoriesActive: false }
  );

  // logic to set root element
  let root: JSX.Element = <Login />;

  return (
    <ActiveContext.Provider
      value={{
        activeTabState,
        activeTabDispatch: dispatchActiveTabState,
      }}
    >
      <div className="app">
        <Routes>
          <Route path="/" element={root} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<Dashboard activeTab="bookmarks" />}
          />
          <Route
            path="/categories"
            element={<Dashboard activeTab="categories" />}
          />
          <Route path="/oauth/callback/:query" element={<OauthCallback />} />
          <Route path="/categories/:id" element={<Category />} />
        </Routes>
      </div>
    </ActiveContext.Provider>
  );
}

export default App;

