import { useEffect, useState } from "react";
import { fetchBookmarks } from "../../api/bookmarks-api";
import { NewCategoryButton } from "../../components/buttons";
import { Bookmark } from "./Bookmark";
import help from "../../assets/icons/help.svg";
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
        <div className="flex justify-between text-primary-1">
          <p className="font-semibold">{bookmarks?.data.length} Bookmark(s)</p>
          <p className="flex cursor-pointer space-x-2 font-medium">
            <img src={help} alt="help icon" /> <span>Need Help?</span>
          </p>
        </div>
        <div className="mt-6">
          {bookmarks?.data.map((bookmark: Bookmark, index: number) =>
            bookmark?.status === "fulfilled" ? (
              <Bookmark
                bookmark={bookmark}
                key={bookmark.value.id}
                index={index}
              />
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

