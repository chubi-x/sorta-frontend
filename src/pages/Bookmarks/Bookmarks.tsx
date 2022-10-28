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
        alert(response?.message);
      }
    };
    getBookmarks();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      <NewCategoryButton />
      {bookmarks?.data?.map((bookmark: Bookmark) => (
        <Bookmark bookmark={bookmark} />
      ))}
    </div>
  );
}

