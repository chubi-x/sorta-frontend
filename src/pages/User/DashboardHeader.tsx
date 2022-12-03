import Lottie from "lottie-react";
import { NewCategoryButton } from "../../components/buttons";
import { StickyDashboardBar, StickyDashboardBarText } from "../../components/miscellaneous";

import userSkeleton from "../../assets/animations/user-details-skeleton.json";
import { useInView } from "react-intersection-observer";
import { BookmarksContextInterface, CategoryModalAction } from "../../App";
import { ActiveTabState } from "../../helpers/Reducer";

type Props = {
  user: User;
  activeTabState: ActiveTabState;
  bookmarksContext: BookmarksContextInterface;
  openCategoryModal: (action: CategoryModalAction, categoryId?: string) => void;
};

export function DashboardHeader({
  user,
  activeTabState,
  bookmarksContext,
  openCategoryModal,
}: Props) {
  const { bookmarks, helpers } = bookmarksContext;
  const { bookmarksScrollRef } = helpers;
  const { bookmarksActive, categoriesActive } = activeTabState;

  const [ref, inView] = useInView({
    root: document.querySelector(".dashboard"),
    initialInView: true,
    threshold: 1,
    rootMargin: "-175px",
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

      <p className="my-2 text-neutral-4">
        {bookmarksActive
          ? " See all your bookmarked tweets below"
          : " See all your bookmark categories below"}
      </p>

      <StickyDashboardBar inView={inView} categoriesActive={categoriesActive}>
        <NewCategoryButton sticky={!inView} openModal={openCategoryModal} />
        <StickyDashboardBarText
          inView={inView}
          bookmarks={bookmarks}
          categoriesActive={categoriesActive}
        />
      </StickyDashboardBar>
      <div className="scroll ref" ref={ref}></div>
    </>
  );
}
