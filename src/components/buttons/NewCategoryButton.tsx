import newCategoryIcon from "../../assets/icons/create-category.svg";
export function NewCategoryButton() {
  return (
    <button className="new-category-btn">
      create category <img src={newCategoryIcon} alt="create category icon" />{" "}
    </button>
  );
}
