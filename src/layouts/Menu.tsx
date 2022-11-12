import logo from "../assets/logo/logo.svg";
import bookmarksIcon from "../assets/icons/bookmarks.svg";
import categoriesIcon from "../assets/icons/categories.svg";
import logoutIcon from "../assets/icons/logout.svg";

import { ActiveContext } from "../pages/User";
import { MenuButton } from "../components/buttons";
import { logoutUser } from "../api";
import { useEffect, useState } from "react";

export type MenuButtonProps = {
  icon: string;
  text: string;
  active?: boolean;
  toggle: () => void;
  showText: boolean;
  mobileClass?: string;
};

export function Menu({ activeTab }: { activeTab: ActiveContext }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function checkWindowWidth() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

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

  function addMobileClass(className: string) {
    const elementClass = windowWidth <= 768 ? className : "";
    return elementClass;
  }

  return (
    <div className={`${addMobileClass("menu__mobile__container")}`}>
      <div
        className={`menu${
          !activeTab.inView ? " menu--collapsed" : ""
        } ${addMobileClass("menu__mobile")}`}
      >
        <div className="menu__logo__container">
          <div className="menu__logo">
            <img src={logo} alt="logo" />
            <h1>Sorta</h1>
          </div>
        </div>
        <div
          className={`menu__buttons ${addMobileClass("menu__mobile__buttons")}`}
        >
          {menuButtons.map(
            ({ icon, text, active, toggle, showText }, index) => (
              <MenuButton
                icon={icon}
                text={text}
                active={active}
                toggle={toggle}
                showText={showText}
                key={index}
                mobileClass={addMobileClass("menu__mobile__button")}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

