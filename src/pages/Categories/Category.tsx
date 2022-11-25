import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MoreButton } from "../../components/buttons";
import { BookmarksContext, CategoryContext } from "../../helpers/Context";
import { Menu } from "../../layouts";
import { dropdownItems } from "./CategoryCard";
import { CardDropdown } from "../../components/dropdowns";
import backIcon from "../../assets/icons/back.svg";
import help from "../../assets/icons/help.svg";
import { Bookmark } from "../Bookmarks";

export function Category() {
  const { categoriesArray } = useContext(CategoryContext);
  const { bookmarks } = useContext(BookmarksContext);

  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;
  const category = categoriesArray.find((item) => item.id === id);

  const categoryBookmarks = bookmarks?.data?.filter((bookmark) =>
    category?.bookmarks.includes(bookmark?.id)
  );
  function backToCategories() {
    navigate("/categories");
  }
  return (
    <div className="category__page__wrapper">
      <Menu />
      <div className="category__page">
        <div
          className="category__page__banner"
          style={{ backgroundImage: `url(${category?.image})` }}
        >
          <div className="category__page__banner__controls">
            <div className="back-button" onClick={backToCategories}>
              <img src={backIcon} alt="back button icon" />
            </div>
            <div className="category__page__dropdown__container">
              <MoreButton showTooltip={setShowTooltip} />
              {showTooltip && (
                <CardDropdown items={dropdownItems} show={setShowTooltip} />
              )}
            </div>
          </div>
          <div className="category__page__banner__text__wrapper rounded-none">
            <div className="category__page__banner__text">
              <h2>{category?.name}</h2>
              <p>
                <span className="text-primary-1">Description: </span>{" "}
                {category?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="category__page__bookmarks__wrapper">
          <div className="my-6 flex items-center justify-between text-primary-1 tall:w-auto">
            <p className="font-semibold">All Bookmarks</p>

            <p className="mr-1 flex cursor-help items-center space-x-2 self-start font-medium">
              <img src={help} alt="help icon" width={"20px"} />
              <span className="hidden md:inline">Need Help?</span>
            </p>
          </div>
          <div className="category__page__bookmarks">
            {categoryBookmarks.map((bookmark, index) => (
              <Bookmark
                key={bookmark.id}
                bookmark={bookmark}
                bookmarksLength={categoryBookmarks.length}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
