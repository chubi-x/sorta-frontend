export type PatchCategoryOptions = {
  categoryId: string;
  body: Omit<Category, "bookmarks" | "id">;
};
export type AddBookmarksToCategory = {
  categoryId: string;
  body: Bookmark[];
};
export type RemoveBookmarksFromCategory = {
  categoryId: string;
  bookmarkIdsToDelete: string[];
};
export async function fetchCategories() {
  const request = await fetch(`${import.meta.env.VITE_API_URL!}/categories`, {
    credentials: "include",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const response = await request.json();
  return response as CategoriesResponse;
}
export async function fetchCategoryById(categoryId: string) {
  const request = await fetch(`${import.meta.env.VITE_API_URL!}/categories/${categoryId}`, {
    credentials: "include",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const response = await request.json();
  return response as CategoryResponse;
}

export async function createCategory(body: Omit<Category, "bookmarks" | "id">) {
  //   const body = JSON.stringify({ bookmarks: ["1", "2", "3", "4"] });
  const request = await fetch(`${import.meta.env.VITE_API_URL!}/categories`, {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
  });
  const response = await request.json();
  return response as CategoryResponse;
}
export async function patchCategory({ categoryId, body }: PatchCategoryOptions) {
  const request = await fetch(`${import.meta.env.VITE_API_URL!}/categories/${categoryId}`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
  });
  const response = await request.json();
  return response as ServerResponse;
}

export async function addBookmarksToCategory({ categoryId, body }: AddBookmarksToCategory) {
  const request = await fetch(
    `${import.meta.env.VITE_API_URL!}/categories/${categoryId}/bookmarks/add`,
    {
      credentials: "include",
      method: "PATCH",
      headers: {
        "ngrok-skip-browser-warning": "true",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarks: body }),
    }
  );
  const response = await request.json();
  return response as ServerResponse;
}
export async function removeBookmarksFromCategory({
  categoryId,
  bookmarkIdsToDelete,
}: RemoveBookmarksFromCategory) {
  const request = await fetch(
    `${import.meta.env.VITE_API_URL!}/categories/${categoryId}/bookmarks/delete`,
    {
      credentials: "include",
      method: "PATCH",
      headers: {
        "ngrok-skip-browser-warning": "true",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookmarkIdsToDelete }),
    }
  );
  const response = await request.json();
  return response as ServerResponse;
}
export async function deleteCategory(categoryId: string) {
  const request = await fetch(`${import.meta.env.VITE_API_URL!}/categories/${categoryId}`, {
    credentials: "include",
    method: "DELETE",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  const response = await request.json();
  return response as ServerResponse;
}
