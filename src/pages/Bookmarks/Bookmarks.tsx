<<<<<<< Updated upstream
import { useEffect, useState } from "react";
=======
import { useEffect, useMemo } from "react";
>>>>>>> Stashed changes
import { fetchBookmarks } from "../../api/bookmarks-api";
import { Bookmark } from "./Bookmark";
import { BookmarksContext } from "../User";

type BookmarksProps = {
  bookmarksContext: BookmarksContext;
};
export function Bookmarks({ bookmarksContext }: BookmarksProps) {
  useEffect(() => {
    const abortController = new AbortController();
    const getBookmarks = async () => {
      const response = await fetchBookmarks(abortController);
      if (response?.success) {
<<<<<<< Updated upstream
        console.log(response);
=======
        // const bookmarks =
        // bookmarksContext.setBookmarks({ ...response.data });
        localStorage.setItem("bookmarks", JSON.stringify(response.data));
>>>>>>> Stashed changes
        bookmarksContext.setBookmarks({ ...response.data });
      } else {
        // alert(response?.message);
        console.log("error fetching bookmarks");
      }
    };
    if (!bookmarksContext.bookmarks) {
      getBookmarks();
    }
    return () => {
      abortController.abort();
    };
  }, []);
<<<<<<< Updated upstream
=======

  const bookmarks = useMemo(() => {
    return bookmarksContext.bookmarks?.data.map(
      (bookmark: Bookmark, index: number) => (
        <Bookmark
          bookmark={bookmark}
          key={bookmark.id}
          index={index}
          bookmarksLength={bookmarksContext.bookmarks?.data.length}
        />
      )
    );
  }, [bookmarksContext.bookmarks]);

  // const halfBookmarks = bookmarksContext.bookmarks?.data.slice(0, 20);
  // console.log(halfBookmarks)
>>>>>>> Stashed changes
  return (
    <>
      <div className="bookmarks__wrapper">
        <div className=" bookmarks">{bookmarks}</div>
      </div>
    </>
  );
}

