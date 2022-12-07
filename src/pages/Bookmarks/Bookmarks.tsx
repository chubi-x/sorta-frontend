// LIBRARIES
import { memo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useLocation, useNavigate } from "react-router-dom";

// APIS
import { fetchBookmarks } from "../../api/bookmarks-api";
import { useQuery } from "react-query";

// COMPONENTS
import { Bookmark } from "./Bookmark";
import withAddBookmarkToCategory from "../../helpers/hocs/withAddBookmarkToCategory";
import { DashboardBarText } from "../../components/miscellaneous";
import { Spinner } from "../../assets/animations";

// TYPES
type BookmarksProps = {
  userFetched: boolean;
  bookmarksScrollRef: React.RefObject<HTMLDivElement>;
};
const Bookmarks = memo(({ userFetched, bookmarksScrollRef }: BookmarksProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.search;
  const toAddToCategory = path.includes("addToCategory");

  const [bookmarksLoading, setBookmarksLoading] = useState(false);

  const [bookmarks, setBookmarks] = useState<Bookmarks>(
    JSON.parse(sessionStorage.getItem("bookmarks")!)
  );
  const bookmarksPerPage = 20;
  const [hasMoreBookmarks, setHasMoreBookmarks] = useState(true);
  const [numOfBookmarksToRender, setNumOfBookmarksToRender] = useState(bookmarksPerPage);

  useQuery("fetch-bookmarks", fetchBookmarks, {
    enabled: userFetched,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess(data) {
      if (data?.success) {
        setBookmarks({ ...data.data });
        sessionStorage.setItem("bookmarks", JSON.stringify(data.data));
      } else {
        if (data?.message) alert(data.message);
        navigate("/login");
      }
    },
    onError(err) {
      if (err) alert(err);
      navigate("/login");
    },
  });

  const renderBookmarks = (bookmarksArray: Bookmark[] | undefined): JSX.Element[] => {
    let renderedBookmarks = [];
    for (let i = 0; i < numOfBookmarksToRender; i++) {
      if (bookmarksArray) {
        if (i < bookmarksArray.length) {
          // const bookmark = bookmarksArray[i];
          // const index = i;
          // const bookmarksLength = bookmarksArray.length;

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
    setBookmarksLoading(true);
    setTimeout(() => {
      loadBookmarks(bookmarks?.data!);
      setBookmarksLoading(false);
    }, 1000);
  };
  const loaderComponent = (
    <div className="mt-10 flex justify-center" key={0}>
      <button
        onClick={loadMoreBookmarks}
        className={`primary-btn primary-btn--medium flex items-center space-x-2 ${
          bookmarksLoading ? "primary-btn--disabled pr-4" : ""
        }`}
        disabled={bookmarksLoading ? true : false}
      >
        <span>Load More</span>
        {bookmarksLoading && <Spinner />}
      </button>
    </div>
  );

  return (
    <>
      <div className="bookmarks__wrapper">
        <div className="bookmarks" ref={bookmarksScrollRef}>
          <DashboardBarText>
            <p className="font-semibold ">{bookmarks ? bookmarks?.data.length : ""} Tweets</p>
          </DashboardBarText>

          {toAddToCategory ? (
            bookmarks.data?.map((bookmark, index) => {
              const EnhancedBookmark = withAddBookmarkToCategory(Bookmark, {
                bookmark,
                index,
                bookmarksLength: bookmarks.data.length,
              });
              return <EnhancedBookmark key={bookmark.id} />;
            })
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={() => {}}
              hasMore={hasMoreBookmarks}
              loader={loaderComponent}
              useWindow={false}
            >
              {renderBookmarks(bookmarks?.data)}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
});
export { Bookmarks };
