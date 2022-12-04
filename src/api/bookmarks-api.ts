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
