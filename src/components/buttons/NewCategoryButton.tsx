import newCategoryIcon from "../../assets/icons/create-category.svg";
type NewCategoryButtonProps = {
  sticky: boolean;
  openModal: (action: "create category" | "edit category", categoryId?: string) => void;
};
export function NewCategoryButton({ sticky, openModal }: NewCategoryButtonProps) {
  return (
    <button
      className={`new-category-btn ${sticky ? "mr-4" : ""}`}
      onClick={() => openModal("create category")}
    >
      create category <img src={newCategoryIcon} alt="create category icon" />
    </button>
  );
}
