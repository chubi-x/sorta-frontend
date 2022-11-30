import { useQuery } from "react-query";
import { fetchCategories } from "../api";

async function getCategories() {
  const response: CategoriesResponse = await fetchCategories();
  return response;
}
export function useQueryCategories(setCategories: (category: Category[]) => void) {
  return useQuery("fetch-categories", getCategories, {
    // enabled: false,
    onSuccess(data) {
      if (data.success) {
        setCategories(data.data);
        localStorage.setItem("categories", JSON.stringify(data.data)!);
      }
    },
    onError(err) {
      alert(err);
    },
  });
}
