import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Menu } from "../../layouts";
import { Bookmark } from "../Bookmarks";
import { MoreButton } from "../../components/buttons";
import { CardDropdown, DropDownItem } from "../../components/dropdowns";

import help from "../../assets/icons/help.svg";
import {
  useDeleteBookmark,
  useFetchCategoryById,
  useRemoveBookmarksFromCategory,
} from "../../api/hooks";
import { BookmarksSkeleton } from "../../assets/animations";

import emptyCategoriesImage from "../../assets/images/empty_categories.svg";
import backIcon from "../../assets/icons/back.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import removeIcon from "../../assets/icons/remove.svg";

type Props = {
  dropdownItems: DropDownItem[];
};
export function Category({ dropdownItems }: Props) {
  const params = useParams();
  const navigate = useNavigate();
  const { mutate: deleteBookmark } = useDeleteBookmark();
  const { mutate: removeBookmarksFromCategory } = useRemoveBookmarksFromCategory();
  const { id } = params;
  const [category, setCategory] = useState<Category>();

  const { data, isSuccess, isFetching } = useFetchCategoryById(id!, navigate);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setCategory(data.data);
    }
  }, [isSuccess, isFetching]);

  const { name, image, description, bookmarks } = { ...category };

  function backToCategories() {
    navigate("/categories");
  }
  const bookmarkDropdownItems = (bookmarkId: string) => [
    {
      icon: removeIcon,
      text: "Remove",
      itemFunction: () =>
        removeBookmarksFromCategory({
          categoryId: id!,
          bookmarkIdsToDelete: [bookmarkId],
        }),
    },
    {
      icon: deleteIcon,
      text: "Delete",
      itemFunction: () => deleteBookmark(bookmarkId),
    },
  ];

  const emptyCategory = (
    <div className="categories--empty">
      <img src={emptyCategoriesImage} alt="empty categories image" />
      <p>
        No bookmarks here yet <br /> click on the button below to add bookmarks
      </p>
      <button
        className="primary-btn primary-btn--medium"
        onClick={() => dropdownItems[0].itemFunction?.(id)}
      >
        Add bookmarks
      </button>
    </div>
  );
  const fullCategory = bookmarks?.map((bookmark, index) => (
    <Bookmark
      key={bookmark.id}
      bookmark={bookmark}
      bookmarksLength={bookmarks.length}
      index={index}
      dropdownItems={bookmarkDropdownItems(bookmark.id)}
    />
  ));
  let categoryPage;
  if (isFetching) {
    categoryPage = <BookmarksSkeleton />;
  } else {
    categoryPage = bookmarks?.length! > 0 ? fullCategory : emptyCategory;
  }
  const isHex = image?.includes("#");

  return (
    <div className="category__page__wrapper">
      <Menu />
      <div className="category__page">
        <div
          className="category__page__banner"
          style={{
            backgroundImage: !isHex ? `url(${image})` : "",
            backgroundColor: isHex ? image : "",
          }}
        >
          <div className="category__page__banner__controls">
            <div className="back-button" onClick={backToCategories}>
              <img src={backIcon} alt="back button icon" />
            </div>
            <div className="category__page__dropdown__container">
              <MoreButton showTooltip={setShowTooltip} />
              {showTooltip && (
                <CardDropdown items={dropdownItems} show={setShowTooltip} resourceId={id} />
              )}
            </div>
          </div>
          <div className="category__page__banner__text__wrapper rounded-none">
            <div className="category__page__banner__text">
              <h2>{name}</h2>
              <p>
                <span className="text-primary-1">Description: </span> {description}
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
          <div className="category__page__bookmarks">{categoryPage}</div>
        </div>
      </div>
    </div>
  );
}
