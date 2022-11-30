// LIBRARIES
import { useReducer, useRef, useState } from "react";
import { useQuery } from "react-query";
import { ActiveContext } from "./helpers/Context";
import { activeTabReducer } from "./helpers/Reducer";

import { Routes, Route } from "react-router-dom";
// PAGES
import { Login, OauthCallback } from "./pages/Auth";
import { Dashboard } from "./pages/User";
import { Categories, Category } from "./pages/Categories";

// ASSETS
import "./assets/styles/App.css";
import { Bookmarks } from "./pages/Bookmarks";
import { fetchCategories } from "./api";

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
  const [activeTabState, dispatchActiveTabState] = useReducer(activeTabReducer, {
    bookmarksActive: true,
    categoriesActive: false,
  });
  const [user, setUser] = useState<User>(JSON.parse(sessionStorage.getItem("user")!) || null);
  const [categories, setCategories] = useState<Category[]>(
    JSON.parse(localStorage.getItem("categories")!) || []
  );
  const [bookmarks, setBookmarks] = useState<Bookmarks>(
    JSON.parse(sessionStorage.getItem("bookmarks")!) || null
  );
  const [bookmarksLoading, setBookmarksLoading] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

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

  function updateUser(user: User) {
    setUser(user);
  }
  function updateBookmarks(bookmarks: Bookmarks) {
    setBookmarks(bookmarks);
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

  async function getCategories() {
    const response: CategoriesResponse = await fetchCategories();
    return response;
  }

  const {} = useQuery("fetch-categories", getCategories, {
    // enabled: false,
    onSuccess(data) {
      if (data.success) {
        setCategories(data.data);
        localStorage.setItem("categories", JSON.stringify(data.data)!);
      }
    },
    onError(err) {
      alert(err);
    },
  });

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
                <Bookmarks user={user} bookmarksContext={bookmarksContext} />
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
              >
                <Categories categoriesArray={categories} openModal={openCategoryModal} />
              </Dashboard>
            }
          />
          <Route path="/oauth/callback/:query" element={<OauthCallback />} />
          <Route
            path="/categories/:id"
            element={<Category bookmarksContext={bookmarksContext} categories={categories} />}
          />
        </Routes>
      </div>
    </ActiveContext.Provider>
  );
}

export default App;
