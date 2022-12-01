import { useQuery, useQueryClient, useMutation } from "react-query";
import { NavigateFunction } from "react-router-dom";
import { createCategory, deleteCategory, fetchCategories } from "../api";

async function get() {
  const response: CategoriesResponse = await fetchCategories();
  return response;
}
async function post(body: Omit<Category, "bookmarks" | "id">) {
  const response = createCategory(body);
  return response as unknown as CategoryResponse;
}
async function _delete(categoryId: string) {
  const response = deleteCategory(categoryId);
  return response as unknown as ServerResponse;
}

export function useFetchCategories(
  setCategories: (category: Category[]) => void,
  navigate: NavigateFunction
) {
  return useQuery("fetch-categories", get, {
    onSuccess(data) {
      if (data.success) {
        setCategories(data.data);
        localStorage.setItem("categories", JSON.stringify(data.data)!);
      } else {
        if (data.message?.includes("not logged")) {
          // alert("You're not logged in!");
          navigate("/login");
        }
      }
    },
    onError(err) {
      console.log(err);
      alert("There was an error fetching your categories");
    },
  });
}

export function usePostCategory() {
  const queryClient = useQueryClient();

  return useMutation(post, {
    async onMutate(newCategory) {
      await queryClient.cancelQueries("fetch-categories");
      const oldCategories = queryClient.getQueryData<CategoriesResponse>("fetch-categories");
      await queryClient.invalidateQueries("fetch-categories");
      if (oldCategories) {
        queryClient.setQueryData<CategoriesResponse>("fetch-categories", {
          ...oldCategories,
          data: [...oldCategories.data, { ...newCategory, id: ".348hv2458uqetn", bookmarks: [] }],
        });
      }
    },
    async onSettled() {
      await queryClient.invalidateQueries("fetch-categories");
    },
  });
}

export function useDeleteCategory(navigate: NavigateFunction) {
  const queryClient = useQueryClient();
  return useMutation(_delete, {
    onMutate(categoryId) {
      const oldData = queryClient.getQueryData<CategoriesResponse>("fetch-categories");
      if (oldData) {
        const updatedCategories = oldData.data.filter((category) => category.id !== categoryId);
        queryClient.setQueryData<CategoriesResponse>("fetch-categories", {
          ...oldData,
          data: [...updatedCategories],
        });
      }
      navigate("/categories");
      return { oldData };
    },
    onError(error, variables, context) {
      alert("error deleting category");
      if (context?.oldData) {
        queryClient.setQueryData<CategoriesResponse>("fetch-categories", context.oldData);
      }
    },
    async onSettled() {
      await queryClient.invalidateQueries("fetch-categories");
    },
  });
}
