// LIBRARIES
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router";

// APIS
import { fetchBookmarks } from "../../api/bookmarks-api";

// COMPONENTS
import { Bookmark } from "./Bookmark";

// TYPES
import { BookmarksContextInterface } from "../../App";

type BookmarksProps = {
  bookmarksContext: BookmarksContextInterface;
};
export function Bookmarks({ bookmarksContext }: BookmarksProps) {
  const { bookmarks, setBookmarks, helpers } = bookmarksContext;

  const bookmarksPerPage = 20;
  const [pageLoading, setPageLoading] = useState(true);
  const [hasMoreBookmarks, setHasMoreBookmarks] = useState(true);
  const [numOfBookmarksToRender, setNumOfBookmarksToRender] = useState(bookmarksPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const getBookmarks = async () => {
      const response = await fetchBookmarks(abortController);
      if (response?.success) {
        sessionStorage.setItem("bookmarks", JSON.stringify(response.data));
        setBookmarks({ ...response.data });
      } else {
        alert(response?.message);
        if (response?.message?.includes("not logged")) {
          navigate("/login");
        }
        console.log("error fetching bookmarks");
      }
    };
    if (!bookmarks) {
      getBookmarks();
    }
    return () => {
      abortController.abort();
    };
  }, []);

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
    helpers.setBookmarksLoading(true);
    setTimeout(() => {
      loadBookmarks(bookmarks?.data!);
      helpers.setBookmarksLoading(false);
    }, 1000);
  };
  const loaderComponent = (
    <div
      className={`mt-10 flex justify-center ${helpers.bookmarksLoading ? "hidden" : "flex"}`}
      key={0}
    >
      <button onClick={loadMoreBookmarks} className="primary-btn primary-btn--medium">
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
