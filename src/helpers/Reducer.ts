export enum ACTIVE_TAB_ACTIONS {
  BOOKMARKS_ACTIVE = "BOOKMARKS ACTIVE",
  CATEGORIES_ACTIVE = "CATEGORIES_ACTIVE",
}
export interface ActiveTabState {
  activeTab: string;
  bookmarksActive: boolean;
  categoriesActive: boolean;
}
export interface ActiveTabAction {
  type: ACTIVE_TAB_ACTIONS;
}
export function activeTabReducer(state: ActiveTabState, action: ActiveTabAction) {
  const { type } = action;
  switch (type) {
    case ACTIVE_TAB_ACTIONS.BOOKMARKS_ACTIVE:
      return { bookmarksActive: true, categoriesActive: false, activeTab: "bookmarks" };
    case ACTIVE_TAB_ACTIONS.CATEGORIES_ACTIVE:
      return { bookmarksActive: false, categoriesActive: true, activeTab: "bookmarks" };

    default:
      return state;
  }
}
