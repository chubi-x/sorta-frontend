import { parse } from "qs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookmarkProps } from "../../pages/Bookmarks";

export type QueryString = {
  action: string;
  categoryId: string;
};
export type AddToCategoryData = {
  true: boolean;
  categoryId?: string;
};
const withAddBookmarkToCategory = (
  WrappedComponent: React.ElementType,
  bookmarkProps: BookmarkProps,
  checkedBookmarks: (e: React.ChangeEvent<HTMLInputElement>, bookmark: Bookmark) => void
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

    return (
      <WrappedComponent
        {...bookmarkProps}
        addToCategory={addToCategoryData}
        trackChecked={checkedBookmarks}
      />
    );
  }
  return WithAddBookmarkToCategory;
};

export default withAddBookmarkToCategory;
