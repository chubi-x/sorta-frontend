import logo from "../../assets/images/logo.svg";
import { useState } from "react";
import { NeutralButton } from "../../components/buttons/NeutralButton";

export function Navbar() {
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
          </div>
          <ul className="nav__list">
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
          <NeutralButton forNav={true} />
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
          <a href="#"> How it works</a>
          <a href="#"> Meet the creators</a>
          <a href="#"> Contribute</a>
          <NeutralButton forNav={false} />
        </div>
      </aside>
    </>
  );
}

