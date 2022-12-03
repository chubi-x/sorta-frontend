import { Link, useNavigate } from "react-router-dom";
import { CategoryCard } from ".";
import { DropDownItem } from "../../components/dropdowns";
import { useDeleteCategory, useFetchCategories } from "../../hooks";

import addIcon from "../../assets/icons/add.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import emptyCategoriesImage from "../../assets/images/empty_categories.svg";
import { CategoryModalAction } from "../../App";

type CategoriesProps = {
  openCategoryModal: (action: CategoryModalAction, categoryId?: string) => void;

  categoriesArray: Category[];
  updateCategories: (categories: Category[]) => void;
};
let dropdownItems: DropDownItem[];

function Categories({ openCategoryModal, categoriesArray, updateCategories }: CategoriesProps) {
  const navigate = useNavigate();

  useFetchCategories(updateCategories, navigate);
  const { mutate: deleteCategory } = useDeleteCategory(navigate);

  dropdownItems = [
    { icon: addIcon, text: "Add bookmarks" },
    {
      icon: editIcon,
      text: "Edit category",
      itemFunction: (categoryId: string) => {
        openCategoryModal(CategoryModalAction.EDIT, categoryId);
      },
    },
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
      <button
        className="primary-btn primary-btn--medium"
        onClick={() => openCategoryModal(CategoryModalAction.CREATE)}
      >
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
