// LIBRARIES
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router";

// APIS
import { useFetchBookmarks } from "../../hooks";
// COMPONENTS
import { Bookmark } from "./Bookmark";

// TYPES
import { BookmarksContextInterface } from "../../App";
import { Spinner } from "../../assets/animations";

type BookmarksProps = {
  userFetched: boolean;
  bookmarksContext: BookmarksContextInterface;
};
export function Bookmarks({ userFetched, bookmarksContext }: BookmarksProps) {
  const { bookmarks, updateBookmarks, helpers } = bookmarksContext;

  const bookmarksPerPage = 20;
  const [pageLoading, setPageLoading] = useState(true);
  const [hasMoreBookmarks, setHasMoreBookmarks] = useState(true);
  const [numOfBookmarksToRender, setNumOfBookmarksToRender] = useState(bookmarksPerPage);
  const navigate = useNavigate();

  useFetchBookmarks(userFetched, updateBookmarks, navigate);

  const renderBookmarks = (bookmarksArray: Bookmark[] | undefined): JSX.Element[] => {
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
    helpers.updateBookmarksLoading(true);
    setTimeout(() => {
      loadBookmarks(bookmarks?.data!);
      helpers.updateBookmarksLoading(false);
    }, 1000);
  };
  const loaderComponent = (
    <div className="mt-10 flex justify-center" key={0}>
      <button
        onClick={loadMoreBookmarks}
        className={`primary-btn primary-btn--medium flex items-center space-x-2 ${
          helpers.bookmarksLoading ? "primary-btn--disabled pr-4" : ""
        }`}
        disabled={helpers.bookmarksLoading ? true : false}
      >
        <span>Load More</span>
        {helpers.bookmarksLoading && <Spinner />}
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
      {renderBookmarks(bookmarks?.data)}
    </InfiniteScroll>
  );
  return (
    <>
      <div className="bookmarks__wrapper">
        <div className="bookmarks" ref={helpers.bookmarksScrollRef}>
          {!pageLoading && infiniteScroll}
        </div>
      </div>
    </>
  );
}
