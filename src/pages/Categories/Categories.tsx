import { useEffect } from "react";
import { QueryObserverResult } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { CategoryCard } from ".";
import { DropDownItem } from "../../components/dropdowns";
import { useDeleteCategory, useQueryCategories } from "../../hooks";

import addIcon from "../../assets/icons/add.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import emptyCategoriesImage from "../../assets/images/empty_categories.svg";

type CategoriesProps = {
  openModal: () => void;
  categoriesArray: Category[];
  updateCategories: (categories: Category[]) => void;
};
let dropdownItems: DropDownItem[];

function Categories({ openModal, categoriesArray, updateCategories }: CategoriesProps) {
  const navigate = useNavigate();

  useQueryCategories(updateCategories, navigate);
  const { mutate: deleteCategory } = useDeleteCategory(navigate);

  dropdownItems = [
    { icon: addIcon, text: "Add bookmarks" },
    { icon: editIcon, text: "Edit category" },
    {
      icon: deleteIcon,
      text: "Delete category",
      itemFunction: (categoryId: string) => {
        deleteCategory(categoryId);
      },
    },
  ];

  const emptyCategories = (
    <div className="categories--empty">
      <img src={emptyCategoriesImage} alt="empty categories image" />
      <p>
        You don't have any category yet <br /> click on the button below to create a new category
      </p>
      <button className="primary-btn primary-btn--medium" onClick={openModal}>
        Create Category
      </button>
    </div>
  );
  const categories = (
    <div className="categories--full">
      {categoriesArray?.map(({ id, image, name, description }) => (
        <CategoryCard image={image} key={id} id={id}>
          <Link to={`/categories/${id}`}>
            <div className="category__card__text">
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          </Link>
        </CategoryCard>
      ))}
      <div className="category__card"></div>
    </div>
  );
  return (
    <div className="categories">{categoriesArray.length > 0 ? categories : emptyCategories}</div>
  );
}

export { Categories, dropdownItems };
