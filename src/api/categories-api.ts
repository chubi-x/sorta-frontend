export type PatchCategoryOptions = {
  categoryId: string;
  body: Omit<Category, "bookmarks" | "id">;
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
export async function patchCategory(options: PatchCategoryOptions) {
  const { categoryId, body } = options;
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
