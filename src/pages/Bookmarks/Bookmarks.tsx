import { useEffect, useState } from "react";
import { fetchBookmarks } from "../../api/bookmarks-api";
import { NewCategoryButton } from "../../components/buttons";
import { Bookmark } from "./Bookmark";
export function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmarks>();

  useEffect(() => {
    const abortController = new AbortController();
    const getBookmarks = async () => {
      const response = await fetchBookmarks(abortController);
      if (response?.success) {
        setBookmarks({ ...response.data });
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
      <NewCategoryButton />

      <div className="bookmarks">
        <div className="mt-10">
          {bookmarks?.data.map((bookmark: Bookmark) =>
            bookmark?.status === "fulfilled" ? (
              <Bookmark bookmark={bookmark} key={bookmark.value.id} />
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

