export async function fetchBookmarks(abortController: AbortController) {
  const request = await fetch("https://localhost:3000/bookmarks", {
    credentials: "include",
    signal: abortController.signal,
  });
  const response: BookmarksResponse = await request.json();
  //   console.log(response);
  return response;
}
