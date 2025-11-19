import React, { createContext } from "react";
import { ActiveTabAction, ActiveTabState } from "./Reducers";

export interface ActiveContextInterface {
  activeTabState: ActiveTabState;
  activeTabDispatch: React.Dispatch<ActiveTabAction>;
}
export interface SearchContextInterface {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const ActiveContext = createContext({} as ActiveContextInterface);
export const SearchContext = createContext({} as SearchContextInterface);
