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
  const { id, name, description, image } = category;
  return (
    <div className="category__card" style={{ backgroundImage: `url(${image})` }}>
      <Link to={`/categories/${id}`}>
        <div className="category__card__text">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </Link>

      <div className="category__card__dropdown">
        <MoreButton showTooltip={setShowTooltip} />
        {showTooltip && <CardDropdown items={dropdownItems} show={setShowTooltip} />}
      </div>
    </div>
  );
}
