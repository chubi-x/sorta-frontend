// LIBRARIES
import { memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useLocation, useNavigate } from "react-router-dom";

// APIS
import { fetchBookmarks } from "../../api/bookmarks-api";
import { useQuery } from "react-query";

// COMPONENTS
import { Bookmark } from "./Bookmark";
import withAddBookmarkToCategory, {
  QueryString,
} from "../../helpers/hocs/withAddBookmarkToCategory";
import { DashboardBarText } from "../../components/miscellaneous";
import { BookmarksSkeleton, Spinner } from "../../assets/animations";
import { parse } from "qs";
import { useAddBookmarksToCategory } from "../../api/hooks";

// TYPES
type BookmarksProps = {
  userFetched: boolean;
  bookmarksScrollRef: React.RefObject<HTMLDivElement>;
  readyToAddToCategory: boolean;
  resetReadyToAddToCategory: () => void;
};
const Bookmarks = memo(
  ({
    userFetched,
    bookmarksScrollRef,
    readyToAddToCategory,
    resetReadyToAddToCategory,
  }: BookmarksProps) => {
    const navigate = useNavigate();
    const location = useLocation().search;
    const toAddToCategory = location.includes("addToCategory");

    const queryString = parse(location, { ignoreQueryPrefix: true });
    const { categoryId } = queryString as unknown as QueryString;

    const { mutate: postBookmarks } = useAddBookmarksToCategory();

    // BOOKMARKS STATE
    const [bookmarksLoading, setBookmarksLoading] = useState(false);

    const [bookmarks, setBookmarks] = useState<Bookmarks>(
      JSON.parse(sessionStorage.getItem("bookmarks")!)
    );
    const bookmarksPerPage = 20;
    const [hasMoreBookmarks, setHasMoreBookmarks] = useState(true);
    const [numOfBookmarksToRender, setNumOfBookmarksToRender] = useState(bookmarksPerPage);

    const { isLoading } = useQuery("fetch-bookmarks", fetchBookmarks, {
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
    // Add bookmarks to category
    useEffect(() => {
      if (readyToAddToCategory) {
        postBookmarks({
          categoryId,
          body: JSON.parse(sessionStorage.getItem(`bookmarksToAddToCategory${categoryId}`)!),
        });
        resetReadyToAddToCategory();
        navigate(`/categories/${categoryId}`);
      }
      return () => sessionStorage.removeItem(`bookmarksToAddToCategory${categoryId}`);
    }, [readyToAddToCategory]);

    const checkedBookmarks: Bookmark[] = [];
    function trackCheckedBookmark(e: React.ChangeEvent<HTMLInputElement>, bookmark: Bookmark) {
      const { checked } = e.target;
      if (checked) {
        !checkedBookmarks.includes(bookmark) ? checkedBookmarks.push(bookmark) : null;
      }
      sessionStorage.setItem(
        `bookmarksToAddToCategory${categoryId}`,
        JSON.stringify(checkedBookmarks)
      )!;
    }
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

    const elements = toAddToCategory ? (
      bookmarks?.data?.map((bookmark, index) => {
        const EnhancedBookmark = withAddBookmarkToCategory(
          Bookmark,
          {
            bookmark,
            index,
            bookmarksLength: bookmarks.data.length,
          },
          trackCheckedBookmark
        );
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
    );

    return (
      <>
        <div className="bookmarks__wrapper">
          <div className="bookmarks" ref={bookmarksScrollRef}>
            <DashboardBarText>
              <p className="font-semibold ">{bookmarks ? bookmarks?.data.length : ""} Tweets</p>
            </DashboardBarText>
            {isLoading ? <BookmarksSkeleton /> : elements}
          </div>
        </div>
      </>
    );
  }
);
export { Bookmarks };
