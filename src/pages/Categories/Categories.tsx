import { Link, useNavigate } from "react-router-dom";
import { CategoryCard } from ".";
import { DropDownItem } from "../../components/dropdowns";
import { useDeleteCategory, useFetchCategories } from "../../hooks";

import emptyCategoriesImage from "../../assets/images/empty_categories.svg";
import { DashboardBarText } from "../../components/miscellaneous";
import { CategoriesSkeleton } from "../../assets/animations";

type CategoriesProps = {
  openCategoryModal: (action: "create category" | "edit category", categoryId?: string) => void;
  categoriesArray: Category[];
  updateCategories: (categories: Category[]) => void;
  dropdownItems: DropDownItem[];
};

function Categories({
  openCategoryModal,
  categoriesArray,
  updateCategories,
  dropdownItems,
}: CategoriesProps) {
  const navigate = useNavigate();

  const { isLoading } = useFetchCategories(updateCategories, navigate);

  const emptyCategories = (
    <div className="categories--empty">
      <img src={emptyCategoriesImage} alt="empty categories image" />
      <p>
        You don't have any category yet <br /> click on the button below to create a new category
      </p>
      <button
        className="primary-btn primary-btn--medium"
        onClick={() => openCategoryModal("create category")}
      >
        Create Category
      </button>
    </div>
  );
  const categories = (
    <div className="categories--full">
      {categoriesArray?.map(({ id, image, name, description }) => (
        <CategoryCard dropdownItems={dropdownItems} image={image} key={id} id={id}>
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
  let child;
  if (isLoading) {
    child = <CategoriesSkeleton />;
  } else {
    child = categoriesArray.length > 0 ? categories : emptyCategories;
  }
  return (
    <div className="categories">
      <DashboardBarText>
        <p className={`font-semibold `}>All Categories</p>
      </DashboardBarText>
      {child}
    </div>
  );
}

export { Categories };
