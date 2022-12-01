// LIBRARIES
import { useEffect, useContext } from "react";
import { ActiveContext } from "../../helpers/Context";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";
import { ACTIVE_TAB_ACTIONS } from "../../helpers/Reducer";

// LAYOUTS
import { Menu } from "../../layouts";

// COMPONENTS
import { NewCategoryButton } from "../../components/buttons";
import { LoadingModal } from "../../components/modals";
import { StickyDashboardBar, StickyDashboardBarText } from "../../components/miscellaneous";

// ASSETS
import userSkeleton from "../../assets/lotties/user-details-skeleton.json";
import { BookmarksContextInterface, CategoryModalAction } from "../../App";

type Props = {
  activeTab: string;
  user: User;
  bookmarksContext: BookmarksContextInterface;
  openCategoryModal: (action: CategoryModalAction, categoryId?: string) => void;

  children: React.ReactNode;
};
export function Dashboard({
  activeTab,
  user,
  bookmarksContext,
  openCategoryModal,
  children,
}: Props) {
  const { activeTabState, activeTabDispatch } = useContext(ActiveContext);
  const { bookmarksActive, categoriesActive } = activeTabState;
  const { bookmarks, helpers } = bookmarksContext;
  const { bookmarksLoading, bookmarksScrollRef } = helpers;

  const [ref, inView] = useInView({
    root: document.querySelector(".dashboard"),
    initialInView: true,
    threshold: 1,
    rootMargin: "-175px",
  });

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
    <div className="dashboard">
      <Menu scroll={bookmarksScrollRef} />
      <div className="main-container">
        <main id="main">
          <div className="dashboard__header" ref={bookmarksScrollRef}>
            {headerInfo}
          </div>

          <p className="my-2 text-neutral-4">
            {bookmarksActive
              ? " See all your bookmarked tweets below"
              : " See all your bookmark categories below"}
          </p>

          <StickyDashboardBar inView={inView} categoriesActive={categoriesActive}>
            <NewCategoryButton sticky={!inView} openModal={openCategoryModal} />
            <StickyDashboardBarText
              activeTab={activeTab}
              inView={inView}
              bookmarks={bookmarks}
              categoriesActive={categoriesActive}
            />
          </StickyDashboardBar>
          <div className="scroll ref" ref={ref}></div>

          {children}
        </main>
      </div>
      {bookmarksLoading && <LoadingModal />}
    </div>
  );
}
