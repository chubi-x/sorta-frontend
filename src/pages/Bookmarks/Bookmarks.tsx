import { useEffect, useState } from "react";
import { fetchBookmarks } from "../../api/bookmarks-api";
import { Bookmark } from "./Bookmark";
import help from "../../assets/icons/help.svg";
import { BookmarksContext } from "../User";

export function Bookmarks({
  bookmarksContext,
}: {
  bookmarksContext: BookmarksContext;
}) {
  useEffect(() => {
    const abortController = new AbortController();
    const getBookmarks = async () => {
      const response = await fetchBookmarks(abortController);
      if (response?.success) {
        console.log(response);
        bookmarksContext.setBookmarks({ ...response.data });
      } else {
        // alert(response?.message);
        console.log("error fetching bookmarks");
      }
    };
    getBookmarks();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <div className="scroll ref" ref={bookmarksContext.ref}></div>
      <div className="bookmarks">
        <div className="mt-6">
          {bookmarksContext.bookmarks?.data.map(
            (bookmark: Bookmark, index: number) => (
              // bookmark?.status === "fulfilled" ? (
              <Bookmark bookmark={bookmark} key={bookmark.id} index={index} />
            )
            // ) : null
          )}
        </div>
      </div>
    </>
  );
}

