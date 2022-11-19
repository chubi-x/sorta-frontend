import logo from "../assets/logo/logo.svg";
import bookmarksIcon from "../assets/icons/bookmarks.svg";
import categoriesIcon from "../assets/icons/categories.svg";
import logoutIcon from "../assets/icons/logout.svg";
import { MenuButton } from "../components/buttons";
import { LoadingModal } from "../components/modals";

import { ActiveContext } from "../pages/User";
import { logoutUser } from "../api";
import { useEffect, useState } from "react";

type MenuProps = {
  activeTab: ActiveContext;
};
export type MenuButtonProps = {
  icon: string;
  text: string;
  active?: boolean;
  toggle: () => void;
  // showText: boolean;
  mobileClass?: string;
};

export function Menu({ activeTab }: MenuProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loggingOut, setLoggingOut] = useState(false);
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
    activeTab.scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    activeTab.setBookmarksActive(true);
    activeTab.setCategoriesActive(false);
  }
  function toggleCategories() {
    activeTab.setCategoriesActive(true);
    activeTab.setBookmarksActive(false);
  }
  function logout() {
    let successful = null;
    const controller = new AbortController();
    const logout = async () => {
      setLoggingOut(true);
      successful = await logoutUser(controller);
      if (successful) {
        setLoggingOut(false);
        localStorage.clear();
        location.href = "http://192.168.1.9:5173/login";
      } else {
        alert("There was a problem logging you out. Please try again.");
      }
    };
    logout();
  }
  const menuButtons: MenuButtonProps[] = [
    {
      icon: bookmarksIcon,
      text: "Home",
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

  function addMobileClass(className: string) {
    const elementClass = windowWidth <= 800 ? className : "";
    return elementClass;
  }

  return (
    <>
      <div
        className={`menu__container ${addMobileClass(
          `menu__mobile__container`
        )} `}
      >
        <div className={`menu ${addMobileClass("menu__mobile")}`}>
          <div className="menu__logo__container">
            <div className="menu__logo">
              <img src={logo} alt="logo" />
              <h1>Sorta</h1>
            </div>
          </div>
          <div
            className={`menu__buttons ${addMobileClass(
              "menu__mobile__buttons"
            )}`}
          >
            {menuButtons.map(({ icon, text, active, toggle }, index) => (
              <MenuButton
                icon={icon}
                text={text}
                active={active}
                toggle={toggle}
                // showText={showText}s
                key={index}
                mobileClass={addMobileClass(
                  `menu__mobile__button ${
                    active ? "menu__mobile__button--active" : ""
                  } `
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {loggingOut && <LoadingModal />}
    </>
  );
}

