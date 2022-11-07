import logo from "../assets/logo/logo.svg";
import bookmarksIcon from "../assets/icons/bookmarks.svg";
import categoriesIcon from "../assets/icons/categories.svg";
import logoutIcon from "../assets/icons/logout.svg";

import { ActiveContext } from "../pages/User";
import { SidebarButton } from "../components/buttons";
import { useNavigate } from "react-router";

export function Sidebar({ activeTab }: { activeTab: ActiveContext }) {
  const navigate = useNavigate();

  function toggleBookmarks() {
    activeTab.setBookmarksActive(true);
    activeTab.setCategoriesActive(false);
  }
  function toggleCategories() {
    activeTab.setCategoriesActive(true);
    activeTab.setBookmarksActive(false);
  }
  function logout() {
    navigate("/logout");
  }
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="logo" />
        <h1>Sorta</h1>
      </div>
      <div className="sidebar__buttons">
        <SidebarButton
          icon={bookmarksIcon}
          active={activeTab.bookmarksActive}
          toggle={toggleBookmarks}
          text="Bookmarks"
        />
        <SidebarButton
          icon={categoriesIcon}
          active={activeTab.categoriesActive}
          toggle={toggleCategories}
          text="Categories"
        />
        <SidebarButton icon={logoutIcon} text="Logout" toggle={logout} />
      </div>
    </div>
  );
}

