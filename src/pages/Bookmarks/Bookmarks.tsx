import { useEffect, useState } from "react";
import { fetchBookmarks } from "../../api/bookmarks-api";
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
        alert(response?.error);
      }
    };
    getBookmarks();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      {bookmarks?.data?.map((bookmark: Bookmark) => (
        <Bookmark bookmark={bookmark} />
      ))}
    </div>
  );
}

