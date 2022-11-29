// LIBRARIES
import { useReducer, useRef, useState } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ActiveContext, UserContextInterface } from "./helpers/Context";
import { activeTabReducer } from "./helpers/Reducer";

import { Routes, Route } from "react-router-dom";
// PAGES
import { Login, OauthCallback } from "./pages/Auth";
import { Dashboard } from "./pages/User";
import { Categories, Category } from "./pages/Categories";

// ASSETS
import "./assets/styles/App.css";
import { Bookmarks } from "./pages/Bookmarks";

interface BookmarksHelpers {
  bookmarksScrollRef: React.RefObject<HTMLDivElement>;
  bookmarksLoading: boolean;
  setBookmarksLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface BookmarksContextInterface {
  bookmarks: Bookmarks;
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmarks>>;
  helpers: BookmarksHelpers;
}
export interface CategoryModalContextInterface {
  categoryModalOpen: boolean;
  openCategoryModal: () => void;
  closeCategoryModal: () => void;
}

export function App() {
  const queryClient = new QueryClient();
  const [activeTabState, dispatchActiveTabState] = useReducer(activeTabReducer, {
    bookmarksActive: true,
    categoriesActive: false,
  });
  const [user, setUser] = useState<User>(JSON.parse(sessionStorage.getItem("user")!) || null);

  const [bookmarks, setBookmarks] = useState<Bookmarks>(
    JSON.parse(sessionStorage.getItem("bookmarks")!) || null
  );
  const [bookmarksLoading, setBookmarksLoading] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const bookmarksScrollRef = useRef<HTMLDivElement>(null);

  const userContext: UserContextInterface = {
    user,
    setUser,
  };
  const bookmarksContext: BookmarksContextInterface = {
    bookmarks,
    setBookmarks,
    helpers: {
      bookmarksScrollRef,
      bookmarksLoading,
      setBookmarksLoading,
    },
  };

  const categoriesArray: Category[] = [
    // {
    //   id: "1342gq3423xfrgm13q495k24tv",
    //   name: "Design",
    //   description:
    //     "lorem ipsum srtnhw4oignm54b wqtigm5qigt5j3ti35g 54g35itkj35gtij5o4g54r g54gt53ijmgt54rjigt54r g5r4gt5jgtig5mgt5rign54r g54rgij54rgti5gtkj5rm4t4jtm5r4gi 54rg5r4igm5r4gtnt5ri",
    //   image:
    //     "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    //   bookmarks: ["1594334343551483904"],
    // },
    // {
    //   id: "1342gqrgm34r21cdf13q495k24tv",
    //   name: "Architecture",
    //   description: "lorem ipsum",
    //   image:
    //     "https://images.unsplash.com/photo-1482053450283-3e0b78b09a70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    //   bookmarks: [],
    // },
    // {
    //   id: "1342gqrgm13qxvcc495k24tv",
    //   name: "Design",
    //   description: "lorem ipsum",
    //   image:
    //     "https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
    //   bookmarks: [],
    // },
    // {
    //   id: "1342gqrgmr3413q495k214tv",
    //   name: "Plants",
    //   description: "lorem ipsum",
    //   image:
    //     "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    //   bookmarks: [],
    // },
    // {
    //   id: "1342gqrgm13q4931x124v5k24tv",
    //   name: "Editorial",
    //   description: "lorem ipsum",
    //   image:
    //     "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
    //   bookmarks: [],
    // },
    // {
    //   id: "1342gqrgm13q495kxfedr24tv",
    //   name: "Science",
    //   description: "lorem ipsum",
    //   image:
    //     "https://images.unsplash.com/photo-1518842013791-b874be246c34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
    //   bookmarks: [],
    // },
  ];

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
    <QueryClientProvider client={queryClient}>
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
                  <Categories categoriesArray={categoriesArray} openModal={openCategoryModal} />
                </Dashboard>
              }
            />
            <Route path="/oauth/callback/:query" element={<OauthCallback />} />
            <Route
              path="/categories/:id"
              element={
                <Category bookmarksContext={bookmarksContext} categories={categoriesArray} />
              }
            />
          </Routes>
        </div>
      </ActiveContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
