import React, { createContext } from "react";
import { ActiveTabAction, ActiveTabState } from "./Reducer";

export interface ActiveContextInterface {
  activeTabState: ActiveTabState;
  activeTabDispatch: React.Dispatch<ActiveTabAction>;
}
interface CategoryContextInterface {
  categoriesArray: Category[];
}
interface BookmarksContextInterface {
  bookmarks: Bookmarks;
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmarks>>;
}
export const ActiveContext = createContext({} as ActiveContextInterface);
export const CategoryContext = createContext({} as CategoryContextInterface);
export const BookmarksContext = createContext({} as BookmarksContextInterface);

