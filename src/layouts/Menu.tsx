import logo from "../assets/logo/logo.svg";
import bookmarksIcon from "../assets/icons/bookmarks.svg";
import categoriesIcon from "../assets/icons/categories.svg";
import logoutIcon from "../assets/icons/logout.svg";

import { ActiveContext } from "../pages/User";
import { MenuButton } from "../components/buttons";
import { logoutUser } from "../api";

export type MenuButtonProps = {
  icon: string;
  text: string;
  active?: boolean;
  toggle: () => void;
  showText: boolean;
};

export function Menu({ activeTab }: { activeTab: ActiveContext }) {
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
  const menuButtons: MenuButtonProps[] = [
    {
      icon: bookmarksIcon,
      text: "Bookmarks",
      active: activeTab.bookmarksActive,
      toggle: toggleBookmarks,
      showText: activeTab.inView,
    },
    {
      icon: categoriesIcon,
      text: "Categories",
      active: activeTab.categoriesActive,
      toggle: toggleCategories,
      showText: activeTab.inView,
    },
    {
      icon: logoutIcon,
      text: "Logout",
      toggle: logout,
      showText: activeTab.inView,
    },
  ];

  return (
    <div className={`menu ${!activeTab.inView ? "w-[200px]" : ""}`}>
      <div className="menu__logo__container">
        <div className="menu__logo">
          <img src={logo} alt="logo" />
          <h1>Sorta</h1>
        </div>
      </div>
      <div className="menu__buttons">
        {menuButtons.map(({ icon, text, active, toggle, showText }, index) => (
          <MenuButton
            icon={icon}
            text={text}
            active={active}
            toggle={toggle}
            showText={showText}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

