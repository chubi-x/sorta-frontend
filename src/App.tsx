// LIBRARIES
import { useReducer, useRef, useState } from "react";
import { ActiveContext } from "./helpers/Context";
import { activeTabReducer, categoryModalReducer, CATEGORY_MODAL_ACTIONS } from "./helpers/Reducers";

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

export function App() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState<User>(JSON.parse(sessionStorage.getItem("user")!) || null);
  const [categories, setCategories] = useState<Category[]>(
    JSON.parse(localStorage.getItem("categories")!) || []
  );

  const [activeTabState, dispatchActiveTabState] = useReducer(activeTabReducer, {
    bookmarksActive: true,
    categoriesActive: false,
  });
  const [categoryModalState, dispatchCategoryModalState] = useReducer(categoryModalReducer, {
    categoryModalOpen: false,
    categoryModalAction: { createCategory: true, editCategory: false },
    categoryIdToUpdate: undefined,
  });

  const { isStale: userFetched } = useFetchUser(logged, updateUser, navigate);

  const bookmarksScrollRef = useRef<HTMLDivElement>(null);

  function login() {
    setLogged(true);
  }

  function login() {
    setLogged(true);
  }

  function updateUser(user: User) {
    setUser(user);
  }

  function updateCategories(categories: Category[]) {
    setCategories(categories);
  }

  function openCategoryModal(action: "create category" | "edit category", categoryId?: string) {
    action === "create category"
      ? dispatchCategoryModalState({ type: CATEGORY_MODAL_ACTIONS.CREATE_CATEGORY })
      : dispatchCategoryModalState({ type: CATEGORY_MODAL_ACTIONS.EDIT_CATEGORY });

    dispatchCategoryModalState({ type: CATEGORY_MODAL_ACTIONS.OPEN_MODAL });

    if (categoryId) {
      dispatchCategoryModalState({
        type: CATEGORY_MODAL_ACTIONS.SET_CATEGORY_ID,
        payload: categoryId,
      });
    }
  }
  function closeCategoryModal() {
    dispatchCategoryModalState({ type: CATEGORY_MODAL_ACTIONS.CLOSE_MODAL });
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
            path="/dashboard/*"
            element={
              <Dashboard activeTabState={activeTabState} bookmarksScrollRef={bookmarksScrollRef}>
                <DashboardHeader
                  user={user}
                  activeTabState={activeTabState}
                  bookmarksScrollRef={bookmarksScrollRef}
                  openCategoryModal={openCategoryModal}
                />
                <Bookmarks userFetched={userFetched} bookmarksScrollRef={bookmarksScrollRef} />
              </Dashboard>
            }
          />
          <Route
            path="/categories"
            element={
              <Dashboard activeTabState={activeTabState} bookmarksScrollRef={bookmarksScrollRef}>
                <DashboardHeader
                  user={user}
                  bookmarksScrollRef={bookmarksScrollRef}
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
          <Route path="/categories/:id" element={<Category />} />
        </Routes>
        {categoryModalState.categoryModalOpen && (
          <CategoryModal
            action={categoryModalState.categoryModalAction}
            category={categories.find(
              (category) => category.id === categoryModalState.categoryIdToUpdate
            )}
            user={user}
            closeModal={closeCategoryModal}
          />
        )}
      </div>
    </ActiveContext.Provider>
  );
}

export default App;
