import { useMutation, useQuery, useQueryClient } from "react-query";
import { NavigateFunction } from "react-router-dom";
import { deleteBookmark, fetchBookmarks } from "../api/bookmarks-api";

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  return useMutation("delete-bookmark", deleteBookmark, {
    async onMutate(bookmarkId) {
      await queryClient.cancelQueries("fetch-bookmarks");
      const oldBookmarksResponse = queryClient.getQueryData<BookmarksResponse>("fetch-bookmarks");
      if (oldBookmarksResponse) {
        const newBookmarks = oldBookmarksResponse.data.data.filter(
          (bookmark) => bookmark.id !== bookmarkId
        );
        queryClient.setQueryData<BookmarksResponse>("fetch-bookmarks", {
          ...oldBookmarksResponse,
          data: { ...oldBookmarksResponse.data, data: newBookmarks },
        });
      }
      return { oldBookmarksResponse };
    },
    onError(error, variables, context) {
      if (context?.oldBookmarksResponse) {
        queryClient.setQueryData<BookmarksResponse>(
          "fetch-bookmarks",
          context.oldBookmarksResponse
        );
      }
    },
    async onSettled() {
      await queryClient.invalidateQueries("fetch-bookmarks");
    },
  });
}
