import { Link, useLocation, useNavigate } from "react-router-dom";
import { CategoryCard } from ".";
import { DropDownItem } from "../../components/dropdowns";
import { useFetchCategories } from "../../api/hooks";

import emptyCategoriesImage from "../../assets/images/empty_categories.svg";
import { DashboardBarText } from "../../components/miscellaneous";
import { CategoriesSkeleton } from "../../assets/animations";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../helpers/Context";

type CategoriesProps = {
  openCategoryModal: (action: "create category" | "edit category", categoryId?: string) => void;
  categoriesArray: Category[];
  updateCategories: (categories: Category[]) => void;
  dropdownItems: DropDownItem[];
};
export function search(data: string, searchQuery: string) {
  return data.toLowerCase().includes(searchQuery.toLowerCase());
}
function Categories({
  openCategoryModal,
  categoriesArray,
  updateCategories,
  dropdownItems,
}: CategoriesProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>(categoriesArray);
  const { searchQuery } = useContext(SearchContext);
  const { isLoading } = useFetchCategories(updateCategories, navigate);
  useEffect(() => {
    if (location.search.includes("categories")) {
      setCategories(
        categoriesArray.filter(
          (category) =>
            search(category.name, searchQuery) || search(category.description, searchQuery)
        )
      );
    }
  }, [searchQuery]);

  const emptyCategoriesList = (
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
  const categoriesList = (
    <div className="categories--full">
      {categories?.map(({ id, image, name, description }) => (
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
    child = categoriesArray.length > 0 ? categoriesList : emptyCategoriesList;
  }
  return (
    <div className="categories">
      <DashboardBarText>
        <p className={`font-semibold`}>All Categories</p>
      </DashboardBarText>
      {child}
    </div>
  );
}

export { Categories };
