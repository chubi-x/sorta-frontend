import Lottie from "lottie-react";
import { StickyDashboardBar } from "../../components/miscellaneous";

import userSkeleton from "../../assets/animations/user-details-skeleton.json";
import dashboardHeaderBtnIcon from "../../assets/icons/create-category.svg";

import { useInView } from "react-intersection-observer";
import { ActiveTabState } from "../../helpers/Reducers";
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import SearchBar from "../../components/search";

type Props = {
  user: User;
  activeTabState: ActiveTabState;
  bookmarksScrollRef: React.RefObject<HTMLDivElement>;
  readyToAddBookmarks?: React.Dispatch<React.SetStateAction<boolean>>;
  openCategoryModal: (action: "create category" | "edit category", categoryId?: string) => void;
};

export function DashboardHeader({
  user,
  activeTabState,
  bookmarksScrollRef,
  openCategoryModal,
  readyToAddBookmarks,
}: Props) {
  const queryString = useLocation().search;
  const toAddBookmarksToCategory = queryString.includes("categoryId");
  function dashboardHeaderBtnAction() {
    toAddBookmarksToCategory ? readyToAddBookmarks?.(true) : openCategoryModal("create category");
  }
  const { bookmarksActive, categoriesActive } = activeTabState;

  const [searchFocus, setSearchFocus] = useState(false);
  const [inViewRef, inView] = useInView({
    root: document.querySelector(".dashboard"),
    initialInView: true,
    threshold: 1,
    rootMargin: "175px",
  });
  const userInfo = (
    <>
      <img src={user?.pfp} alt="profile pic" className="w-10 rounded-full" />
      <h1 className="dashboard__header__text">
        <span>Hello</span> {user?.name}!
      </h1>
    </>
  );
  const userInfoSkeleton = (
    <Lottie animationData={userSkeleton} loop={true} autoplay={true} style={{ width: "150px" }} />
  );
  const bookmarksHeader = user ? userInfo : userInfoSkeleton;

  const categoriesHeader = <h1 className="dashboard__header__text">Categories</h1>;
  const headerInfo: JSX.Element = bookmarksActive ? bookmarksHeader : categoriesHeader;

  return (
    <>
      <div className="dashboard__header" ref={bookmarksScrollRef}>
        {headerInfo}
      </div>

      <p className="my-2 text-neutral-4" ref={inViewRef}>
        {bookmarksActive
          ? " See all your bookmarked tweets below"
          : " See all your bookmark categories below"}
      </p>

      <StickyDashboardBar inView={inView} categoriesActive={categoriesActive}>
        <SearchBar
          stickyBar={!inView}
          categoriesActive={categoriesActive}
          focus={searchFocus}
          setFocus={setSearchFocus}
        />
        <button
          className={`dashboard-header-btn ${!inView ? "w-2/3 md:w-auto" : ""} ${
            searchFocus && !inView ? "hidden md:flex" : ""
          }`}
          onClick={dashboardHeaderBtnAction}
        >
          {toAddBookmarksToCategory ? "add to category" : "create category"}
          <img src={dashboardHeaderBtnIcon} alt="create category icon" />
        </button>
      </StickyDashboardBar>
    </>
  );
}
