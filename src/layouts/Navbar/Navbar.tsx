import logo from "../../assets/images/logo.svg";
import { useState, useContext } from "react";
import { LoginContext } from "../../helpers/Context";

import { NeutralButton } from "../../components/buttons/NeutralButton";

export function Navbar({ authFunction }: { authFunction: any }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { isLogged } = useContext(LoginContext);

  function toggleMobileMenu() {
    setMobileMenu(!mobileMenu);
  }
  return (
    <>
      <nav className="nav">
        <div className="nav__left">
          <div className="nav__logo">
            <img src={logo} alt="logo" />
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
          {isLogged ? null : (
            <NeutralButton forNav={true} authFunction={authFunction} />
          )}
        </div>
      </nav>
      {/* mobile menu */}
      <aside
        className={`nav__mobile__container ${
          !mobileMenu ? "nav__mobile__container--closed" : ""
        } lg:hidden `}
      >
        <div className={`nav__mobile`}>
          <div className="nav__cancel" onClick={toggleMobileMenu}>
            <span className="nav__cancel__top"></span>
            <span className="nav__cancel__bottom"></span>
          </div>
          <div className="nav__logo mt-6">
            <img src={logo} alt="logo" />
          </div>
          <div className="nav__links mb-16">
            <a href="#"> How it works</a>
            <a href="#"> Meet the creators</a>
            <a href="#"> Contribute</a>
          </div>
          {isLogged ? null : (
            <NeutralButton forNav={false} authFunction={authFunction} />
          )}{" "}
        </div>
      </aside>
    </>
  );
}

