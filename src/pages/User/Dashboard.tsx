// LIBRARIES
import React, { useEffect, useRef, useState, useContext } from "react";
import { ActiveContext, BookmarksContext } from "../../helpers/Context";
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
import help from "../../assets/icons/help.svg";
import userSkeleton from "../../assets/lotties/user-details-skeleton.json";
import { ACTIVE_TAB_ACTIONS } from "../../helpers/Reducer";

export interface BookmarksHelpers {
  scrollRef: React.RefObject<HTMLDivElement>;
  bookmarksLoading: boolean;
  setBookmarksLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Dashboard({ activeTab }: { activeTab: string }) {
  const { activeTabState, activeTabDispatch } = useContext(ActiveContext);
  const { bookmarks } = useContext(BookmarksContext);
  const { bookmarksActive, categoriesActive } = activeTabState;

  const navigate = useNavigate();

  const [user, setUser] = useState<User>(
    JSON.parse(sessionStorage.getItem("user")!) || null
  );

  const [bookmarksLoading, setBookmarksLoading] = useState(false);

  const [ref, inView] = useInView({
    root: document.querySelector(".dashboard"),
    initialInView: true,
    threshold: 1,
    rootMargin: "-175px",
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const bookmarksHelpers: BookmarksHelpers = {
    scrollRef,
    bookmarksLoading,
    setBookmarksLoading,
  };

  useEffect(() => {
    if (activeTab === "bookmarks") {
      activeTabDispatch({ type: ACTIVE_TAB_ACTIONS.BOOKMARKS_ACTIVE });
    } else if (activeTab === "categories") {
      activeTabDispatch({ type: ACTIVE_TAB_ACTIONS.CATEGORIES_ACTIVE });
    }
  }, [activeTab]);

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

        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...userResponse.data })
        );
      } else {
        // alert(userResponse.message);
        // if not logged in backend, log out in frontend
        if (userResponse?.message?.includes("not logged in")) {
          alert(userResponse.message);
          setUser((prev) => {
            return { ...prev, isLogged: false };
          });
          navigate("/login");
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
      <Menu scroll={scrollRef} />
      <div className="main-container">
        <main id="main">
          <div className="dashboard__header" ref={scrollRef}>
            {headerInfo}
          </div>

          <p className="my-2 text-neutral-4">
            {bookmarksActive
              ? " See all your bookmarked tweets below"
              : " See all your bookmark categories below"}
          </p>
          <div
            className={`new-category-container ${
              !inView ? "new-category-container--stuck" : ""
            }`}
            style={{ width: `${categoriesActive ? "100%" : ""}` }}
          >
            <NewCategoryButton sticky={!inView} />
            <div
              className={`my-6 flex items-center text-primary-1 tall:w-auto ${
                !inView ? "w-[auto] justify-end" : "justify-between"
              }`}
            >
              <p className={`font-semibold ${!inView ? "hidden" : ""}`}>
                {activeTab === "bookmarks"
                  ? `   ${bookmarks ? bookmarks?.data.length : ""} Tweets`
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
            <Bookmarks helpers={bookmarksHelpers} />
          ) : (
            <Categories />
          )}
        </main>
      </div>
      {bookmarksLoading && <LoadingModal />}
    </div>
  );
}

