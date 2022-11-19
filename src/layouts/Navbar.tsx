import logo from "../assets/logo/logo.svg";
import logoWhite from "../assets/logo/logo-white.svg";
import { useState } from "react";

import { NeutralButton } from "../components/buttons/NeutralButton";

type NavbarProps = {
  authLink?: () => string;
  loading?: boolean | undefined;
  loginReady?: boolean;
};
export function Navbar({ authLink, loginReady }: NavbarProps) {
  const [mobileMenu, setMobileMenu] = useState(false);
  function toggleMobileMenu() {
    setMobileMenu(!mobileMenu);
  }
  return (
    <>
      <nav className="nav">
        <div className="nav__left">
          <div className="nav__logo">
            <img src={logo} alt="logo" />
            <span>Sorta</span>
          </div>
          <ul className="nav__links">
            <li className="nav__items">
              <a href="#"> How it works</a>
            </li>
            <li className="nav__items">
              <a href="#"> Meet the creators</a>
            </li>
            <li className="nav__items">
              <a href="#"> Contribute to the project</a>
            </li>
          </ul>
        </div>
        <div className="nav__right">
          <div
            className="hamburger flex cursor-pointer lg:hidden"
            onClick={toggleMobileMenu}
          >
            <span className="hamburger__btn hamburger__btn__top"></span>
            <span className="hamburger__btn hamburger__btn__middle"></span>
            <span className="hamburger__btn hamburger__btn__bottom"></span>
          </div>
          {loginReady && authLink && (
            <NeutralButton forNav={true} authLink={authLink} />
          )}
        </div>
      </nav>
      {/* mobile menu */}
      <aside
        className={`nav__mobile__container ${
          !mobileMenu ? "nav__mobile__container--closed" : ""
        } lg:hidden `}
      >
        <div className="nav__mobile">
          <div className="nav__cancel" onClick={toggleMobileMenu}>
            <span className="nav__cancel__top"></span>
            <span className="nav__cancel__bottom"></span>
          </div>
          <div className="nav__logo nav__logo__mobile mt-14">
            <img src={logoWhite} alt="logo" />
            <h1>Sorta</h1>
          </div>
          <div className="nav__links mb-16">
            <a href="#"> How it works</a>
            <a href="#"> Meet the creators</a>
            <a href="#"> Contribute</a>
          </div>
          <div className="mb-10">
            {loginReady && authLink && (
              <NeutralButton forNav={false} authLink={authLink} />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

