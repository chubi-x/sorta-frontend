import React, { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { fetchUser } from "../../api";
import { LoginContext } from "../../helpers/Context";
import { Menu } from "../../layouts";
import { Bookmarks } from "../Bookmarks";
import { NewCategoryButton } from "../../components/buttons";
import logo from "../../assets/logo/logo.svg";
import arrowUp from "../../assets/icons/up.svg";
import help from "../../assets/icons/help.svg";

export interface ActiveContext {
  bookmarksActive: boolean;
  categoriesActive: boolean;
  setBookmarksActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoriesActive: React.Dispatch<React.SetStateAction<boolean>>;
  inView: boolean;
}
export interface BookmarksContext {
  bookmarks: Bookmarks | undefined;
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmarks | undefined>>;
  ref: (node?: Element | null | undefined) => void;
}
export function Dashboard() {
  const { userContext } = useContext(LoginContext);
  const [bookmarksActive, setBookmarksActive] = useState(true);
  const [categoriesActive, setCategoriesActive] = useState(false);

  const [bookmarks, setBookmarks] = useState<Bookmarks>();
  const { ref, inView, entry } = useInView({
    root: document.querySelector(".dashboard"),
    initialInView: true,
    threshold: 1,
    rootMargin: "-175px",
  });

  const bookmarksContext: BookmarksContext = {
    bookmarks,
    setBookmarks,
    ref,
  };

  const activeTabContext: ActiveContext = {
    bookmarksActive,
    setBookmarksActive,
    categoriesActive,
    setCategoriesActive,
    inView,
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

  return (
    <div className="dashboard">
      <Menu activeTab={activeTabContext} />
      <main id="main">
        <div className="menu__logo__container mb-14 pl-0 md:hidden">
          <div className="menu__logo pl-0">
            <img src={logo} alt="logo" />
            <h1>Sorta</h1>
          </div>
        </div>
        <div className="user__header flex items-center space-x-3">
          <img
            src={userContext.user?.pfp}
            alt="profile pic"
            className="w-10 rounded-full"
          />
          <h1 className="user__name font-header-2 text-md font-medium text-primary-1">
            <span className="font-body text-[20px] font-normal">Hello</span>{" "}
            {userContext.user?.name}!
          </h1>
        </div>
        <p className="my-2 text-neutral-4">
          {bookmarksActive
            ? " See all your bookmarked tweets"
            : " See all your categories"}
        </p>
        <div
          className={`sticky top-[-40px] z-10 w-full bg-neutral-7 ${
            !inView
              ? "new-category-container flex items-center justify-between pr-36"
              : ""
          }`}
        >
          <NewCategoryButton />
          <div
            className={`flex h-10 w-[80%]  text-primary-1 ${
              !inView ? "w-auto justify-end" : "justify-between"
            }`}
          >
            <p className={`font-semibold ${!inView ? "hidden" : ""}`}>
              {bookmarks?.data.length} Bookmark(s)
            </p>
            <p className="flex cursor-pointer items-center space-x-2 font-medium">
              <img src={help} alt="help icon" width={"20px"} />{" "}
              <span>Need Help?</span>
            </p>
          </div>
        </div>

        {bookmarksActive && <Bookmarks bookmarksContext={bookmarksContext} />}
      </main>
    </div>
  );
}

