import { useQuery, useQueryClient, useMutation } from "react-query";
import { NavigateFunction } from "react-router-dom";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoryById,
  patchCategory,
} from "../api";

export function useFetchCategories(
  setCategories: (category: Category[]) => void,
  navigate: NavigateFunction
) {
  return useQuery("fetch-categories", fetchCategories, {
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
export function useFetchCategoryById(categoryId: string) {
  return useQuery(["fetch-category", categoryId], () => fetchCategoryById(categoryId));
}
export function usePostCategory() {
  const queryClient = useQueryClient();

  return useMutation(createCategory, {
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

export function usePatchCategory() {
  const queryClient = useQueryClient();
  return useMutation(patchCategory, {
    async onMutate({ categoryId, body }) {
      await queryClient.cancelQueries("fetch-categories");
      const oldCategoriesResponse =
        queryClient.getQueryData<CategoriesResponse>("fetch-categories");
      if (oldCategoriesResponse) {
        const newCategories = oldCategoriesResponse.data.map((category) => {
          if (category.id === categoryId) {
            const { image, description } = body;
            category = {
              ...category,
              image: image ? image : category.image,
              description: description ? description : category.description,
            };
          }
          return category;
        });
        queryClient.setQueryData<CategoriesResponse>("fetch-categories", {
          ...oldCategoriesResponse,
          data: [...newCategories],
        });

        return { oldCategoriesResponse };
      }
    },
    onError(error, variables, context) {
      if (context?.oldCategoriesResponse) {
        queryClient.setQueryData<CategoriesResponse>(
          "fetch-categories",
          context.oldCategoriesResponse
        );
      }
    },
    async onSettled() {
      console.log("settled");
      await queryClient.invalidateQueries("fetch-categories");
    },
  });
}

export function useDeleteCategory(navigate: NavigateFunction) {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    async onMutate(categoryId) {
      await queryClient.cancelQueries("fetch-categories");

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
