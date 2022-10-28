import logo from "../../assets/icons/logo.svg";
import home from "../../assets/icons/bookmark.svg";
import categories from "../../assets/icons/categories.svg";
import logout from "../../assets/icons/logout.svg";
import { ActiveContext } from "../../pages/User";

export function Sidebar({ activeTab }: { activeTab: ActiveContext }) {
  function toggleBookmarks() {
    activeTab.setBookmarksActive(true);
    activeTab.setCategoriesActive(false);
  }
  function toggleCategories() {
    activeTab.setCategoriesActive(true);
    activeTab.setBookmarksActive(false);
  }
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="logo" />
        <h1>Sorta</h1>
      </div>
      <div className="sidebar__buttons">
        <div
          className={`sidebar__button ${
            activeTab.bookmarksActive ? "sidebar__button--active" : ""
          }`}
          onClick={toggleBookmarks}
        >
          <img className="sidebar__icon" src={home} alt="home icon" />
          <h1>Home</h1>
        </div>
        <div
          className={`sidebar__button ${
            activeTab.categoriesActive ? "sidebar__button--active" : ""
          }`}
          onClick={toggleCategories}
        >
          <img
            className="sidebar__icon"
            src={categories}
            alt="categories icon"
          />
          <h1>Categories</h1>
        </div>
        <div className="sidebar__button">
          <img className="sidebar__icon" src={logout} alt="logout icon" />
          <h1>Logout</h1>
        </div>
      </div>
    </div>
  );
}
