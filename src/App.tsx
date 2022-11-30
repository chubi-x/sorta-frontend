// LIBRARIES
import { useReducer, useRef, useState } from "react";
import { ActiveContext } from "./helpers/Context";
import { activeTabReducer } from "./helpers/Reducer";

import { Routes, Route, useNavigate } from "react-router-dom";
// PAGES
import { Login, OauthCallback } from "./pages/Auth";
import { Dashboard } from "./pages/User";
import { Bookmarks } from "./pages/Bookmarks";
import { Categories, Category } from "./pages/Categories";

// ASSETS
import "./assets/styles/App.css";
import { useQueryCategories, useQueryUser } from "./hooks";

export interface UserContextInterface {
  user: User;
  updateUser: (user: User) => void;
}
interface BookmarksHelpers {
  bookmarksScrollRef: React.RefObject<HTMLDivElement>;
  bookmarksLoading: boolean;
  updateBookmarksLoading: (state: boolean) => void;
}
export interface BookmarksContextInterface {
  bookmarks: Bookmarks;
  updateBookmarks: (bookmarks: Bookmarks) => void;
  helpers: BookmarksHelpers;
}
export interface CategoryModalContextInterface {
  categoryModalOpen: boolean;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
}

export function App() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState<User>(JSON.parse(sessionStorage.getItem("user")!) || null);
  const [categories, setCategories] = useState<Category[]>(
    JSON.parse(localStorage.getItem("categories")!) || []
  );
  const [bookmarks, setBookmarks] = useState<Bookmarks>(
    JSON.parse(sessionStorage.getItem("bookmarks")!) || null
  );
  const [bookmarksLoading, setBookmarksLoading] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [activeTabState, dispatchActiveTabState] = useReducer(activeTabReducer, {
    bookmarksActive: true,
    categoriesActive: false,
  });

  const { refetch: refetchCategories } = useQueryCategories(updateCategories, navigate);
  const { isSuccess: userFetched } = useQueryUser(logged, updateUser, navigate);

  const bookmarksScrollRef = useRef<HTMLDivElement>(null);

  const userContext: UserContextInterface = {
    user,
    updateUser,
  };
  const bookmarksContext: BookmarksContextInterface = {
    bookmarks,
    updateBookmarks,
    helpers: {
      bookmarksScrollRef,
      bookmarksLoading,
      updateBookmarksLoading,
    },
  };

  function login() {
    setLogged(true);
  }

  function updateUser(user: User) {
    setUser(user);
  }
  function updateBookmarks(bookmarks: Bookmarks) {
    setBookmarks(bookmarks);
  }
  function updateCategories(categories: Category[]) {
    setCategories(categories);
  }
  function updateBookmarksLoading(state: boolean) {
    setBookmarksLoading(state);
  }

  function openCategoryModal() {
    setCategoryModalOpen(true);
  }
  function closeCategoryModal() {
    setCategoryModalOpen(false);
  }

  const categoryModalContext: CategoryModalContextInterface = {
    categoryModalOpen,
    openCategoryModal,
    closeCategoryModal,
  };

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
            element={
              <Dashboard
                activeTab="bookmarks"
                userContext={userContext}
                bookmarksContext={bookmarksContext}
                categoryModalContext={categoryModalContext}
              >
                <Bookmarks
                  user={user}
                  userFetched={userFetched}
                  bookmarksContext={bookmarksContext}
                />
              </Dashboard>
            }
          />
          <Route
            path="/categories"
            element={
              <Dashboard
                activeTab="categories"
                userContext={userContext}
                bookmarksContext={bookmarksContext}
                categoryModalContext={categoryModalContext}
                refetchCategories={refetchCategories}
              >
                <Categories
                  categoriesArray={categories}
                  fetchCategories={refetchCategories}
                  openModal={openCategoryModal}
                />
              </Dashboard>
            }
          />
          <Route path="/oauth/callback/:query" element={<OauthCallback login={login} />} />
          <Route
            path="/categories/:id"
            element={
              <Category
                bookmarksContext={bookmarksContext}
                refetchCategories={refetchCategories}
                categories={categories}
              />
            }
          />
        </Routes>
      </div>
    </ActiveContext.Provider>
  );
}

export default App;
