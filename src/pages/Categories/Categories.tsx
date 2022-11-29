import { CategoryCard } from ".";
import emptyCategoriesImage from "../../assets/images/empty_categories.svg";

type CategoriesProps = {
  openModal: () => void;
  categoriesArray: Category[];
};
export function Categories({ openModal, categoriesArray }: CategoriesProps) {
  const emptyCategories = (
    <div className="categories--empty">
      <img src={emptyCategoriesImage} alt="empty categories image" />
      <p>
        You have not created any category yet <br /> click on the button below to create a new
        category
      </p>
      <button className="primary-btn primary-btn--medium" onClick={openModal}>
        Create Category
      </button>
    </div>
  );
  const categories = (
    <div className="categories--full">
      {categoriesArray.map((category) => (
        <CategoryCard category={category} key={category.id} />
      ))}
    </div>
  );
  return (
    <div className="categories">{categoriesArray.length > 0 ? categories : emptyCategories}</div>
  );
}
