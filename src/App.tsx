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
import { useFetchUser } from "./hooks";
import { CategoryModal } from "./components/modals";
import { DashboardHeader } from "./pages/User/DashboardHeader";

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
  openCategoryModal: (action: CategoryModalAction, categoryId?: string) => void;
  categoryModalAction?: CategoryModalAction;
  categoryIdToUpdate: string | undefined;
  closeCategoryModal: () => void;
}

export enum CategoryModalAction {
  CREATE = "CREATE",
  EDIT = "EDIT",
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
  const [categoryModalAction, setCategoryModalAction] = useState<CategoryModalAction>();
  const [categoryIdToUpdate, setCategoryIdToUpdate] = useState<string | undefined>(undefined);
  const [activeTabState, dispatchActiveTabState] = useReducer(activeTabReducer, {
    activeTab: "bookmarks",
    bookmarksActive: true,
    categoriesActive: false,
  });

  const { isSuccess: userFetched } = useFetchUser(logged, updateUser, navigate);

  const bookmarksScrollRef = useRef<HTMLDivElement>(null);

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

  function openCategoryModal(action: CategoryModalAction, categoryId?: string) {
    setCategoryModalAction(action);
    setCategoryModalOpen(true);

    if (categoryId) {
      setCategoryIdToUpdate(categoryId);
    }
  }
  function closeCategoryModal() {
    setCategoryModalOpen(false);
  }
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
              <Dashboard activeTabState={activeTabState} bookmarksContext={bookmarksContext}>
                <DashboardHeader
                  user={user}
                  activeTabState={activeTabState}
                  bookmarksContext={bookmarksContext}
                  openCategoryModal={openCategoryModal}
                />
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
              <Dashboard activeTabState={activeTabState} bookmarksContext={bookmarksContext}>
                <DashboardHeader
                  user={user}
                  bookmarksContext={bookmarksContext}
                  openCategoryModal={openCategoryModal}
                  activeTabState={activeTabState}
                />
                <Categories
                  categoriesArray={categories}
                  updateCategories={updateCategories}
                  openCategoryModal={openCategoryModal}
                />
              </Dashboard>
            }
          />
          <Route path="/oauth/callback/:query" element={<OauthCallback login={login} />} />
          <Route
            path="/categories/:id"
            element={<Category bookmarksContext={bookmarksContext} />}
          />
        </Routes>
        {categoryModalOpen && (
          <CategoryModal
            action={categoryModalAction}
            category={categories.find((category) => category.id === categoryIdToUpdate)}
            user={user}
            closeModal={closeCategoryModal}
          />
        )}
      </div>
    </ActiveContext.Provider>
  );
}

export default App;
