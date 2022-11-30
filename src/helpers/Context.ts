import React, { createContext } from "react";
import { ActiveTabAction, ActiveTabState } from "./Reducer";

export interface ActiveContextInterface {
  activeTabState: ActiveTabState;
  activeTabDispatch: React.Dispatch<ActiveTabAction>;
}

export const ActiveContext = createContext({} as ActiveContextInterface);
