import React, { createContext } from "react";
import { ActiveTabAction, ActiveTabState } from "./Reducer";

export interface UserContextInterface {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
export interface ActiveContextInterface {
  activeTabState: ActiveTabState;
  activeTabDispatch: React.Dispatch<ActiveTabAction>;
}
export interface CategoryContextInterface {
  categoriesArray: Category[];
}

export const ActiveContext = createContext({} as ActiveContextInterface);
export const CategoryContext = createContext({} as CategoryContextInterface);
