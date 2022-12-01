import { useQuery } from "react-query";
import { NavigateFunction } from "react-router-dom";
import { fetchBookmarks } from "../api/bookmarks-api";
const getBookmarks = async () => {
  const abortController = new AbortController();
  const response: BookmarksResponse = await fetchBookmarks(abortController);
  return response;
};
export function useQueryBookmarks(
  userFetched: boolean,
  updateBookmarks: (bookmarks: Bookmarks) => void,
  navigate: NavigateFunction
) {
  return useQuery("get-bookmarks", getBookmarks, {
    enabled: userFetched,
    refetchOnMount: false,
    onSuccess(data) {
      if (data.success) {
        updateBookmarks({ ...data.data });
        sessionStorage.setItem("bookmarks", JSON.stringify(data.data));
      } else {
        alert(data.message);
        navigate("/login");
      }
    },
    onError(err) {
      alert(err);
      navigate("/login");
    },
  });
}
