// LIBRARIES
import { useEffect, useContext } from "react";
import { ActiveContext } from "../../helpers/Context";
import { ActiveTabState, ACTIVE_TAB_ACTIONS } from "../../helpers/Reducers";

// LAYOUTS
import { useLocation } from "react-router-dom";
import { Menu } from "../../layouts";

type Props = {
  activeTabState: ActiveTabState;
  bookmarksScrollRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};
export function Dashboard({ bookmarksScrollRef, children }: Props) {
  const { activeTabDispatch } = useContext(ActiveContext);
  const location = useLocation();
  const path = location.pathname.replace("/", "");

  useEffect(() => {
    if (path === "bookmarks") {
      activeTabDispatch({ type: ACTIVE_TAB_ACTIONS.BOOKMARKS_ACTIVE });
    } else if (path === "categories") {
      activeTabDispatch({ type: ACTIVE_TAB_ACTIONS.CATEGORIES_ACTIVE });
    }
  }, [path]);

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

  return (
    <div className="dashboard">
      <Menu scroll={bookmarksScrollRef} />
      <div className="main-container">
        <main id="main">{children}</main>
      </div>
    </div>
  );
}
