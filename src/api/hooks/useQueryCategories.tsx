import { useQuery, useQueryClient, useMutation } from "react-query";
import { NavigateFunction } from "react-router-dom";
import {
  addBookmarksToCategory,
  createCategory,
  deleteCategory,
  fetchCategories,
  fetchCategoryById,
  patchCategory,
  removeBookmarksFromCategory,
} from "..";

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
export function useFetchCategoryById(categoryId: string, navigate: NavigateFunction) {
  return useQuery(["fetch-category", categoryId], () => fetchCategoryById(categoryId), {
    onSuccess(data) {
      if (!data.success) {
        if (data.message?.includes("not logged")) {
          // alert("You're not logged in!");
          navigate("/login");
        }
      }
    },
  });
}
export function usePostCategory() {
  const queryClient = useQueryClient();

  return useMutation(createCategory, {
    async onMutate(newCategory) {
      await queryClient.cancelQueries("fetch-categories");
      const oldCategories = queryClient.getQueryData<CategoriesResponse>("fetch-categories");
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
      await queryClient.cancelQueries(["fetch-category", categoryId]);
      const oldCategoriesResponse =
        queryClient.getQueryData<CategoriesResponse>("fetch-categories");

      const oldCategoryResponse: CategoryResponse | undefined =
        queryClient.getQueryData<CategoryResponse>(["fetch-category", categoryId]);

      if (oldCategoriesResponse && oldCategoryResponse) {
        const newCategories = oldCategoriesResponse.data.map((category) => {
          if (category.id === categoryId) {
            const { image, description, name } = body;
            category = {
              ...category,
              name: name ? name : category.name,
              image: image ? image : category.image,
              description: description ? description : category.description,
            };
          }
          return category;
        });
        queryClient.setQueryData<CategoryResponse>(["fetch-category", categoryId], {
          ...oldCategoryResponse,
          data: { ...oldCategoryResponse.data, ...body },
        });

        queryClient.setQueryData<CategoriesResponse>("fetch-categories", {
          ...oldCategoriesResponse,
          data: [...newCategories],
        });

        return { oldCategoriesResponse, oldCategoryResponse };
      }
    },
    onError(error, variables, context) {
      const { categoryId } = variables;
      if (context?.oldCategoriesResponse || context?.oldCategoryResponse) {
        alert("Error updating category");
        queryClient.setQueryData<CategoriesResponse>(
          "fetch-categories",
          context.oldCategoriesResponse
        );
        queryClient.setQueryData<CategoryResponse>(["fetch-category", categoryId], {
          ...context.oldCategoryResponse,
        });
      }
    },
    async onSettled(data, error, { categoryId }, context) {
      await queryClient.invalidateQueries("fetch-categories");
      await queryClient.invalidateQueries(["fetch-category", categoryId]);
    },
  });
}
export function useAddBookmarksToCategory() {
  const queryClient = useQueryClient();
  return useMutation(addBookmarksToCategory, {
    async onMutate({ categoryId, body: bookmarks }) {
      await queryClient.cancelQueries("fetch-categories");
      await queryClient.cancelQueries(["fetch-category", categoryId]);
      const oldCategory = queryClient.getQueryData<CategoryResponse>([
        "fetch-category",
        categoryId,
      ]);
      if (oldCategory) {
        queryClient.setQueryData(["fetch-category", categoryId], {
          ...oldCategory,
          data: {
            ...oldCategory.data,
            bookmarks,
          },
        });
      }
      return { oldCategory };
    },
    onError(error, { categoryId }, context) {
      if (context?.oldCategory) {
        queryClient.setQueryData<CategoryResponse>(["fetch-category", categoryId], {
          ...context.oldCategory,
        });
      }
    },
    async onSettled(data, error, { categoryId }, context) {
      await queryClient.invalidateQueries(["fetch-category", categoryId]);
    },
  });
}
export function useRemoveBookmarksFromCategory() {
  const queryClient = useQueryClient();
  return useMutation(removeBookmarksFromCategory, {
    async onMutate({ categoryId, bookmarkIdsToDelete }) {
      await queryClient.cancelQueries("fetch-categories");
      await queryClient.cancelQueries(["fetch-category", categoryId]);
      const oldCategory = queryClient.getQueryData<CategoryResponse>([
        "fetch-category",
        categoryId,
      ]);
      if (oldCategory) {
        queryClient.setQueryData(["fetch-category", categoryId], {
          ...oldCategory,
          data: {
            ...oldCategory.data,
            bookmarks: oldCategory.data.bookmarks.filter(
              (bookmark) => !bookmarkIdsToDelete.includes(bookmark.id)
            ),
          },
        });
      }
      return { oldCategory };
    },
    onError(error, { categoryId }, context) {
      if (context?.oldCategory) {
        queryClient.setQueryData<CategoryResponse>(["fetch-category", categoryId], {
          ...context.oldCategory,
        });
      }
    },
    async onSettled(data, error, { categoryId }, context) {
      await queryClient.invalidateQueries(["fetch-category", categoryId]);
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