import { useEffect } from "react";
import { QueryObserverResult } from "react-query";
import { Link } from "react-router-dom";
import { CategoryCard } from ".";
import emptyCategoriesImage from "../../assets/images/empty_categories.svg";

type CategoriesProps = {
  openModal: () => void;
  categoriesArray: Category[];
  fetchCategories?: () => Promise<QueryObserverResult<CategoriesResponse, unknown>>;
};

export function Categories({ openModal, categoriesArray, fetchCategories }: CategoriesProps) {
  async function fetch() {
    await fetchCategories?.();
  }
  useEffect(() => {
    fetch();
  }, []);

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
      {categoriesArray.map(({ id, image, name, description }) => (
        <CategoryCard image={image} key={id}>
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
