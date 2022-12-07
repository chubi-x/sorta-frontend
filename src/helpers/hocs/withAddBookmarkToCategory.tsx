import { parse } from "qs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookmarkProps } from "../../pages/Bookmarks";

type QueryString = {
  action?: string;
  categoryId?: string;
};
export type AddToCategoryData = {
  true: boolean;
  categoryId?: string;
};
const withAddBookmarkToCategory = (
  WrappedComponent: React.ElementType,
  bookmarkProps: BookmarkProps
) => {
  function WithAddBookmarkToCategory() {
    const [addToCategory, setAddToCategory] = useState(false);
    const location = useLocation();
    const queryString = parse(location.search, { ignoreQueryPrefix: true });
    const { action, categoryId } = queryString as unknown as QueryString;

    const addToCategoryData: AddToCategoryData = { true: addToCategory, categoryId };
    useEffect(() => {
      if (action?.includes("addToCategory")) {
        setAddToCategory(true);
      } else {
        setAddToCategory(false);
      }
    }, [action]);

    return <WrappedComponent {...bookmarkProps} addToCategory={addToCategoryData} />;
  }
  return WithAddBookmarkToCategory;
};

export default withAddBookmarkToCategory;
