export async function fetchBookmarks() {
  try {
    const request = await fetch(`${import.meta.env.VITE_API_URL!}/bookmarks`, {
      credentials: "include",
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    const response = await request.json();
    return response as BookmarksResponse;
  } catch (err) {
    // TODO: log to logging service
    console.log("Error fetching bookmarks", err);
  }
}

export async function deleteBookmark(bookmarkId: string) {
  try {
    const request = await fetch(`${import.meta.env.VITE_API_URL!}/bookmarks/${bookmarkId}`, {
      credentials: "include",
      method: "DELETE",
      headers: { "ngrok-skip-browser-warning": "true" },
    });
    const response = await request.json();
    return response as ServerResponse;
  } catch (err) {
    // TODO: log to logging service
    console.log("Error deleting bookmark", err);
  }
}
