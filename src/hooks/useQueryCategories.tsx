import { useQuery, useMutation } from "react-query";
import { NavigateFunction } from "react-router-dom";
import { createCategory, fetchCategories } from "../api";

async function getCategories() {
  const response: CategoriesResponse = await fetchCategories();
  return response;
}
async function postCategory(body: Omit<Category, "bookmarks" | "id">) {
  const response = createCategory(body);
  return response as unknown as ServerResponse;
}
export function useQueryCategories(
  setCategories: (category: Category[]) => void,
  navigate: NavigateFunction
) {
  return useQuery("fetch-categories", getCategories, {
    enabled: false,
    onSuccess(data) {
      if (data.success) {
        setCategories(data.data);
        localStorage.setItem("categories", JSON.stringify(data.data)!);
      }
      // else {
      //   if (data.message?.includes("not logged")) {
      //     // alert("You're not logged in!");
      //     navigate("/login");
      //   }
      // }
    },
    onError(err) {
      alert(err);
    },
  });
}

export function usePostCategory() {
  return useMutation(postCategory);
}
