import React, { useContext, useEffect, useState } from "react";
import { fetchUser } from "../../api";
import { LoginContext } from "../../helpers/Context";
import { Sidebar } from "../../layouts/Sidebar";
import { Bookmarks } from "../Bookmarks";

export interface ActiveContext {
  bookmarksActive: boolean;
  categoriesActive: boolean;
  setBookmarksActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoriesActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Dashboard() {
  const { user, setUser } = useContext(LoginContext);
  const [bookmarksActive, setBookmarksActive] = useState(true);
  const [categoriesActive, setCategoriesActive] = useState(false);

  const activeTabContext: ActiveContext = {
    bookmarksActive,
    setBookmarksActive,
    categoriesActive,
    setCategoriesActive,
  };
  useEffect(() => {
    const abortController = new AbortController();
    const returnUser = async () => {
      const userResponse: UserResponse = await fetchUser(abortController);
      if (userResponse.success) {
        setUser((prev) => {
          return {
            ...prev,
            ...userResponse.data,
          };
        });
        localStorage.setItem("user", JSON.stringify({ ...user }));
      } else {
        // if not logged in backend, log out in frontend
        if (userResponse.message?.includes("not logged in")) {
          setUser((prev) => {
            return { ...prev, isLogged: false };
          });
        }
      }
    };
    returnUser();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className="flex h-full">
      <Sidebar activeTab={activeTabContext} />
      <main className="mx-auto w-3/5 pt-10">
        <img src={user?.pfp} alt="profile pic" />
        <h1>Welcome, {user?.name}</h1>

        {bookmarksActive && <Bookmarks />}
      </main>
    </div>
  );
}

