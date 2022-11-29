import { useState } from "react";
import { Link } from "react-router-dom";
import { MoreButton } from "../../components/buttons";
import { CardDropdown, DropDownItem } from "../../components/dropdowns";

//ASSETS
import addIcon from "../../assets/icons/add.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";

export const dropdownItems: DropDownItem[] = [
  { icon: addIcon, text: "Add bookmarks" },
  { icon: editIcon, text: "Edit category" },
  { icon: deleteIcon, text: "Delete category" },
];

type CategoryProps = {
  category: Category;
};
export function CategoryCard({ category }: CategoryProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="category__card"
      style={{ backgroundImage: `url(${category.image})` }}
    >
      <Link to={`/categories/${category.id}`}>
        <div className="category__card__text">
          <h2>{category.name}</h2>
          <p>{category.description}</p>
        </div>
      </Link>

      <div className="category__card__dropdown">
        <MoreButton showTooltip={setShowTooltip} />
        {showTooltip && (
          <CardDropdown items={dropdownItems} show={setShowTooltip} />
        )}
      </div>
    </div>
  );
}
