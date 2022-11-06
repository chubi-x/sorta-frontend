import React, { useContext, useEffect, useState } from "react";
import { fetchUser } from "../../api";
import { LoginContext } from "../../helpers/Context";
import { Sidebar } from "../../layouts";
import { Bookmarks } from "../Bookmarks";
import arrowUp from "../../assets/icons/up.svg";
export interface ActiveContext {
  bookmarksActive: boolean;
  categoriesActive: boolean;
  setBookmarksActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoriesActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Dashboard() {
  const { userContext } = useContext(LoginContext);
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
      if (userResponse?.success) {
        userContext.setUser((prev) => {
          return {
            ...prev,
            ...userResponse.data,
          };
        });
        localStorage.setItem("user", JSON.stringify({ ...userContext.user }));
      } else {
        // if not logged in backend, log out in frontend
        if (userResponse?.message?.includes("not logged in")) {
          userContext.setUser((prev) => {
            return { ...prev, isLogged: false };
          });
        }
      }
    };
    returnUser();
    return () => {
      abortController.abort();
    };
  }, [bookmarksActive]);

  function scrollToTop() {
    document.getElementById("main")!.scrollTo({
      top: 1,
      behavior: "smooth",
    });
  }
  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTabContext} />
      <div className="divider"></div>
      <main id="main">
        <div className="user__header flex items-center space-x-3">
          <img
            src={userContext.user?.pfp}
            alt="profile pic"
            className="w-10 rounded-full"
          />
          <h1 className="font-header-2 text-md font-medium text-primary-1">
            <span className="font-body text-[20px] font-normal">Hello</span>{" "}
            {userContext.user?.name}!
          </h1>
        </div>
        <p className="my-2 text-neutral-4">
          {bookmarksActive
            ? " See all your bookmarked tweets"
            : " See all your categories"}
        </p>
        {bookmarksActive && <Bookmarks />}
      </main>

      <div className="arrowUp" onClick={scrollToTop}>
        <img src={arrowUp} alt="scroll to top button" />
      </div>
    </div>
  );
}

