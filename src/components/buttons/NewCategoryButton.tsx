import newCategoryIcon from "../../assets/icons/create-category.svg";
export function NewCategoryButton({ sticky }: { sticky: boolean }) {
  return (
    <button className={`new-category-btn ${sticky ? "mr-4" : ""}`}>
      create category <img src={newCategoryIcon} alt="create category icon" />
    </button>
  );
}

