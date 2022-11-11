import logo from "../assets/logo/logo.svg";
import bookmarksIcon from "../assets/icons/bookmarks.svg";
import categoriesIcon from "../assets/icons/categories.svg";
import logoutIcon from "../assets/icons/logout.svg";

import { ActiveContext } from "../pages/User";
import { SidebarButton } from "../components/buttons";
import { useNavigate } from "react-router";
import { logoutUser } from "../api";

export type SidebarButtonProps = {
  icon: string;
  text: string;
  active?: boolean;
  toggle: () => void;
};

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
    const controller = new AbortController();
    const logout = async () => await logoutUser(controller);
    logout();
    location.reload();
  }
  const sidebarButtons: SidebarButtonProps[] = [
    {
      icon: bookmarksIcon,
      text: "Bookmarks",
      active: activeTab.bookmarksActive,
      toggle: toggleBookmarks,
    },
    {
      icon: categoriesIcon,
      text: "Categories",
      active: activeTab.categoriesActive,
      toggle: toggleCategories,
    },
    {
      icon: logoutIcon,
      text: "Logout",
      toggle: logout,
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar__logo__container">
        <div className="sidebar__logo">
          <img src={logo} alt="logo" />
          <h1>Sorta</h1>
        </div>
      </div>
      <div className="sidebar__buttons">
        {sidebarButtons.map(({ icon, text, active, toggle }) => (
          <SidebarButton
            icon={icon}
            text={text}
            active={active}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}

