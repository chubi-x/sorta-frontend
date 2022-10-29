export async function fetchBookmarks(abortController: AbortController) {
  try {
    const request = await fetch("https://localhost:3000/bookmarks", {
      credentials: "include",
      signal: abortController.signal,
    });
    const response: BookmarksResponse = await request.json();
    return response;
  } catch (err) {
    console.log("Error fetching bookmarks", err);
  }
}

