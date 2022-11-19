import { useEffect, useState } from "react";
import { fetchBookmarks } from "../../api/bookmarks-api";
import { Bookmark } from "./Bookmark";
import { BookmarksContext } from "../User";
import InfiniteScroll from "react-infinite-scroller";
type BookmarksProps = {
  bookmarksContext: BookmarksContext;
};
export function Bookmarks({ bookmarksContext }: BookmarksProps) {
  const bookmarksPerPage = 20;
  const [pageLoading, setPageLoading] = useState(true);
  const [hasMoreBookmarks, setHasMoreBookmarks] = useState(true);
  const [numOfBookmarksToRender, setNumOfBookmarksToRender] =
    useState(bookmarksPerPage);

  useEffect(() => {
    const abortController = new AbortController();
    const getBookmarks = async () => {
      const response = await fetchBookmarks(abortController);
      if (response?.success) {
        localStorage.setItem("bookmarks", JSON.stringify(response.data));
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

  const renderBookmarks = (
    bookmarksArray: Bookmark[] | undefined
  ): JSX.Element[] => {
    let renderedBookmarks = [];
    for (let i = 0; i < numOfBookmarksToRender; i++) {
      if (bookmarksArray) {
        if (pageLoading) {
          setPageLoading(false);
        }
        if (i < bookmarksArray.length) {
          renderedBookmarks.push(
            <Bookmark
              bookmark={bookmarksArray[i]}
              key={bookmarksArray[i].id}
              index={i}
              bookmarksLength={bookmarksArray.length}
            />
          );
        }
      }
    }
    return renderedBookmarks;
  };
  const loadBookmarks = (bookmarksArray: Bookmark[]) => {
    if (numOfBookmarksToRender >= bookmarksArray?.length) {
      setHasMoreBookmarks(false);
    } else {
      setNumOfBookmarksToRender(numOfBookmarksToRender + bookmarksPerPage);
    }
  };
  const loadMoreBookmarks = () => {
    bookmarksContext.setBookmarksLoading(true);
    setTimeout(() => {
      loadBookmarks(bookmarksContext.bookmarks?.data!);
      bookmarksContext.setBookmarksLoading(false);
    }, 1000);
  };
  const loaderComponent = (
    <div
      className={`mt-10 flex justify-center ${
        bookmarksContext.bookmarksLoading ? "hidden" : "flex"
      }`}
      key={0}
    >
      <button
        onClick={loadMoreBookmarks}
        className="primary-btn primary-btn--medium"
      >
        Load More
      </button>
    </div>
  );
  const infiniteScroll = (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => {}}
      hasMore={hasMoreBookmarks}
      loader={loaderComponent}
      useWindow={false}
    >
      {renderBookmarks(bookmarksContext.bookmarks?.data)}
    </InfiniteScroll>
  );
  return (
    <>
      <div className="bookmarks__wrapper">
        <div className="bookmarks" ref={bookmarksContext.scrollRef}>
          {!pageLoading && infiniteScroll}
        </div>
      </div>
    </>
  );
}

