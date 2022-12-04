import { useQuery } from "react-query";
import { NavigateFunction } from "react-router-dom";
import { fetchBookmarks } from "../api/bookmarks-api";

export function useFetchBookmarks(
  userFetched: boolean,
  updateBookmarks: (bookmarks: Bookmarks) => void,
  navigate: NavigateFunction
) {
  return useQuery("get-bookmarks", fetchBookmarks, {
    enabled: userFetched,
    refetchOnMount: false,
    onSuccess(data) {
      if (data?.success) {
        updateBookmarks({ ...data.data });
        sessionStorage.setItem("bookmarks", JSON.stringify(data.data));
      } else {
        alert(data?.message);
        navigate("/login");
      }
    },
    onError(err) {
      alert(err);
      navigate("/login");
    },
  });
}
