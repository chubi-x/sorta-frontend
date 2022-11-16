import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { fetchUser } from "../../api";
import { LoginContext } from "../../helpers/Context";
import { Sidebar } from "../../layouts";
import { Bookmarks } from "../Bookmarks";
import { NewCategoryButton } from "../../components/buttons";
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
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmarks>>;
  ref: (node?: Element | null | undefined) => void;
}
export function Dashboard() {
  const { userContext } = useContext(LoginContext);
  const [bookmarksActive, setBookmarksActive] = useState(true);
  const [categoriesActive, setCategoriesActive] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmarks>(
    JSON.parse(localStorage.getItem("bookmarks")!)
  );
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

  // useEffect(() => {
  //   // check if user has scrolled to bottom
  //   scrollRef.current!.onscroll = function (ev) {
  //     if (
  //       Math.abs(
  //         scrollRef.current!.scrollHeight -
  //           scrollRef.current!.clientHeight -
  //           scrollRef.current!.scrollTop
  //       ) < 1
  //     ) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const returnUser = async () => {
      const userResponse: UserResponse = await fetchUser(abortController);
      if (userResponse?.success) {
        localStorage.setItem("user", JSON.stringify({ ...userContext.user }));

        userContext.setUser((prev) => {
          return {
            ...prev,
            ...userResponse.data,
          };
        });
      } else {
        // alert(userResponse.message);
        // if not logged in backend, log out in frontend
        if (userResponse?.message?.includes("not logged in")) {
          userContext.setUser((prev) => {
            return { ...prev, isLogged: false };
          });
        }
      }
    };
    if (!userContext.user) {
      returnUser();
    }
    return () => {
      abortController.abort();
    };
  }, []);

  const memoizedBookmarks = useMemo(
    () => <Bookmarks bookmarksContext={bookmarksContext} />,
    [bookmarksContext]
  );
  return (
    <div className="dashboard">
      <Menu activeTab={activeTabContext} />
      <div className={`main-container `}>
        <main id="main" ref={scrollRef}>
          <div className="logo__container">
            <div className="menu__logo pl-0">
              <img src={logo} alt="logo" />
              <h1>Sorta</h1>
            </div>
          </div>
          <div className="user__header">
            <img
              src={userContext.user?.pfp}
              alt="profile pic"
              className="w-10 rounded-full"
            />
            <h1 className="user__name">
              <span>Hello</span> {userContext.user?.name}!
            </h1>
          </div>
          <p className="my-2 text-neutral-4">
            {bookmarksActive
              ? " See all your bookmarked tweets"
              : " See all your categories"}
          </p>
          <div
            className={`new-category-container ${
              !inView ? "new-category-container--stuck" : ""
            }`}
          >
            <NewCategoryButton sticky={!inView} />
            <div
              className={`my-6 flex items-center text-primary-1 tall:w-auto ${
                !inView ? "w-[auto] justify-end" : "justify-between"
              }`}
            >
              <p className={`font-semibold ${!inView ? "hidden" : ""}`}>
                {bookmarks?.data.length} Bookmark(s)
              </p>
              <p className="mr-1 flex cursor-pointer items-center space-x-2 self-start font-medium">
                <img src={help} alt="help icon" width={"20px"} />
                <span className="hidden md:inline">Need Help?</span>
              </p>
            </div>
          </div>
          <div className="scroll ref" ref={ref}></div>

          {bookmarksActive && memoizedBookmarks}
        </main>
      </div>
    </div>
  );
}

