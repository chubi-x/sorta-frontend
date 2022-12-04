import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ActiveContext } from "../helpers/Context";
import { logoutUser } from "../api";

import { MenuButton } from ".";
import { LoadingModal } from "../components/modals";
import logo from "../assets/logo/logo.svg";
import bookmarksIcon from "../assets/icons/bookmarks.svg";
import categoriesIcon from "../assets/icons/categories.svg";
import logoutIcon from "../assets/icons/logout.svg";
import { ACTIVE_TAB_ACTIONS } from "../helpers/Reducers";

export type MenuButtonProps = {
  icon: string;
  text: string;
  active?: boolean;
  toggle: () => void;
  mobileClass?: string;
};

export function Menu({ scroll }: { scroll?: React.RefObject<HTMLDivElement> }) {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loggingOut, setLoggingOut] = useState(false);

  const { activeTabState, activeTabDispatch } = useContext(ActiveContext);
  const { bookmarksActive, categoriesActive } = activeTabState;

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
    if (bookmarksActive) {
      scroll?.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      activeTabDispatch({ type: ACTIVE_TAB_ACTIONS.BOOKMARKS_ACTIVE });
      navigate("/dashboard");
    }
  }
  function toggleCategories() {
    activeTabDispatch({ type: ACTIVE_TAB_ACTIONS.CATEGORIES_ACTIVE });
    navigate("/categories");
  }
  function logout() {
    let successful: boolean | undefined;
    const controller = new AbortController();
    const logout = async () => {
      setLoggingOut(true);
      successful = await logoutUser(controller);
      if (successful) {
        setLoggingOut(false);
        localStorage.clear();
        sessionStorage.clear();
        location.href = `${import.meta.env.VITE_FRONTEND_URL}/login`;
      } else {
        alert("There was a problem logging you out. Please try again.");
        setLoggingOut(false);
      }
    };
    logout();
  }
  const menuButtons: MenuButtonProps[] = [
    {
      icon: bookmarksIcon,
      text: "Home",
      active: bookmarksActive,
      toggle: toggleBookmarks,
    },
    {
      icon: categoriesIcon,
      text: "Categories",
      active: categoriesActive,
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
      <div className={`menu__container ${addMobileClass(`menu__mobile__container`)} `}>
        <div className={`menu ${addMobileClass("menu__mobile")}`}>
          <div className="menu__logo__container">
            <div className="menu__logo">
              <img src={logo} alt="logo" />
              <h1>Sorta</h1>
            </div>
          </div>
          <div className={`menu__buttons ${addMobileClass("menu__mobile__buttons")}`}>
            {menuButtons.map(({ icon, text, active, toggle }, index) => (
              <MenuButton
                icon={icon}
                text={text}
                active={active}
                toggle={toggle}
                // showText={showText}s
                key={index}
                mobileClass={addMobileClass(
                  `menu__mobile__button ${active ? "menu__mobile__button--active" : ""} `
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
