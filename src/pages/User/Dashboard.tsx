import React, { useContext, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchUser } from "../../api";
import { LoginContext } from "../../helpers/Context";
import { Menu } from "../../layouts";
import { Bookmarks } from "../Bookmarks";
import { NewCategoryButton } from "../../components/buttons";
import { LoadingModal } from "../../components/modals";

import logo from "../../assets/logo/logo.svg";
import help from "../../assets/icons/help.svg";
import userSkeleton from "../../assets/lotties/user-details-skeleton.json";
import Lottie from "lottie-react";

export interface ActiveContext {
  bookmarksActive: boolean;
  categoriesActive: boolean;
  setBookmarksActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoriesActive: React.Dispatch<React.SetStateAction<boolean>>;
  inView: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
}
export interface BookmarksContext {
  bookmarks: Bookmarks | undefined;
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmarks>>;
  scrollRef: React.RefObject<HTMLDivElement>;
  bookmarksLoading: boolean;
  setBookmarksLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Dashboard() {
  const { userContext } = useContext(LoginContext);
  const [bookmarksActive, setBookmarksActive] = useState(true);
  const [bookmarksLoading, setBookmarksLoading] = useState(false);

  const [categoriesActive, setCategoriesActive] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmarks>(
    JSON.parse(localStorage.getItem("bookmarks")!)
  );
  const [ref, inView] = useInView({
    root: document.querySelector(".dashboard"),
    initialInView: true,
    threshold: 1,
    rootMargin: "-175px",
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const bookmarksContext: BookmarksContext = {
    bookmarks,
    setBookmarks,
    scrollRef,
    bookmarksLoading,
    setBookmarksLoading,
  };

  const activeTabContext: ActiveContext = {
    bookmarksActive,
    setBookmarksActive,
    categoriesActive,
    setCategoriesActive,
    inView,
    scrollRef,
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
        userContext.setUser((prev) => {
          return {
            ...prev,
            ...userResponse.data,
          };
        });
        localStorage.setItem("user", JSON.stringify({ ...userContext.user }));
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
    returnUser();

    return () => {
      abortController.abort();
    };
  }, []);

  const userInfo = (
    <>
      <img
        src={userContext.user?.pfp}
        alt="profile pic"
        className="w-10 rounded-full"
      />
      <h1 className="user__name">
        <span>Hello</span> {userContext.user?.name}!
      </h1>
    </>
  );
  const userInfoSkeleton = (
    <Lottie
      animationData={userSkeleton}
      loop={true}
      autoplay={true}
      style={{ width: "150px" }}
    />
  );
  return (
    <div className="dashboard">
      <Menu activeTab={activeTabContext} />
      <div className={`main-container `}>
        <main id="main">
          <div className="logo__container">
            <div className="menu__logo pl-0">
              <img src={logo} alt="logo" />
              <h1>Sorta</h1>
            </div>
          </div>

          <div className="user__header">
            {userContext.user?.pfp ? userInfo : userInfoSkeleton}
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

          {bookmarksActive && <Bookmarks bookmarksContext={bookmarksContext} />}
        </main>
      </div>
      {bookmarksLoading && <LoadingModal />}
    </div>
  );
}


