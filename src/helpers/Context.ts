import React, { createContext } from "react";
import { ActiveTabAction, ActiveTabState } from "./Reducers";

export interface ActiveContextInterface {
  activeTabState: ActiveTabState;
  activeTabDispatch: React.Dispatch<ActiveTabAction>;
}

export const ActiveContext = createContext({} as ActiveContextInterface);
