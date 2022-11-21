// LIBRARIES
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";

// API
import { fetchUser } from "../../api";
// LAYOUTS
import { Menu } from "../../layouts";
// PAGES
import { Bookmarks } from "../Bookmarks";
import { Categories } from "../Categories";

// COMPONENTS
import { NewCategoryButton } from "../../components/buttons";
import { LoadingModal } from "../../components/modals";
// ASSETS
import logo from "../../assets/logo/logo.svg";
import help from "../../assets/icons/help.svg";
import userSkeleton from "../../assets/lotties/user-details-skeleton.json";

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
  const navigate = useNavigate();

  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user")!) || null
  );

  const [bookmarksActive, setBookmarksActive] = useState(true);
  const [bookmarksLoading, setBookmarksLoading] = useState(false);

  const [categoriesActive, setCategoriesActive] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmarks>(
    JSON.parse(sessionStorage.getItem("bookmarks")!)
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
        setUser((prev) => {
          return {
            ...prev,
            ...userResponse.data,
            // isLogged: true,
          };
        });

        localStorage.setItem("user", JSON.stringify({ ...userResponse.data }));
      } else {
        // alert(userResponse.message);
        // if not logged in backend, log out in frontend
        if (userResponse?.message?.includes("not logged in")) {
          alert(userResponse.message + "from dashboard");
          setUser((prev) => {
            return { ...prev, isLogged: false };
          });
          navigate("/login");
        }
      }
    };
    if (!user) returnUser();

    return () => {
      abortController.abort();
    };
  }, []);
  const userInfo = (
    <>
      <img src={user?.pfp} alt="profile pic" className="w-10 rounded-full" />
      <h1 className="dashboard__header__text">
        <span>Hello</span> {user?.name}!
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
  const bookmarksHeader = user ? userInfo : userInfoSkeleton;
  const categoriesHeader = (
    <h1 className="dashboard__header__text">Categories</h1>
  );
  const headerInfo: JSX.Element = bookmarksActive
    ? bookmarksHeader
    : categoriesHeader;

  return (
    <div className="dashboard">
      <Menu activeTab={activeTabContext} />
      <div className="main-container">
        <main id="main">
          <div className="logo__container">
            <div className="menu__logo pl-0">
              <img src={logo} alt="logo" />
              <h1>Sorta</h1>
            </div>
          </div>

          <div className="dashboard__header">{headerInfo}</div>

          <p className="my-2 text-neutral-4">
            {bookmarksActive
              ? " See all your bookmarked tweets below"
              : " See all your bookmark categories below"}
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
                {bookmarksActive
                  ? `${bookmarks?.data.length} Bookmark(s)`
                  : "All Categories"}
              </p>

              <p className="mr-1 flex cursor-help items-center space-x-2 self-start font-medium">
                <img src={help} alt="help icon" width={"20px"} />
                <span className="hidden md:inline">Need Help?</span>
              </p>
            </div>
          </div>
          <div className="scroll ref" ref={ref}></div>

          {bookmarksActive ? (
            <Bookmarks bookmarksContext={bookmarksContext} />
          ) : (
            <Categories />
          )}
        </main>
      </div>
      {bookmarksLoading && <LoadingModal />}
    </div>
  );
}

