import emptyCategories from "../../assets/images/empty_categories.svg";
import { PrimaryButton } from "../../components/buttons";
export function Categories() {
  return (
    <div className="categories">
      <div className="categories--empty">
        <img src={emptyCategories} alt="empty categories image" />
        <p>
          You have not created any category yet <br /> click on the button below
          to create a new category
        </p>
        <button className="primary-btn primary-btn--medium">
          Create Category
        </button>
      </div>
    </div>
  );
}
