import React, { useEffect, useContext } from "react";
import { SearchContext } from "../../helpers/Context";
import { useNavigate } from "react-router-dom";

type Props = {
  categoriesActive: boolean;
  stickyBar: boolean;
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function SearchBar({ categoriesActive, stickyBar, focus, setFocus }: Props) {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  useEffect(() => {}, []);
  function beginSearch(e: React.FocusEvent<HTMLInputElement>) {
    navigate(
      {
        search: `?search=${categoriesActive ? "categories" : "bookmarks"}`,
      },
      { replace: false }
    );
    setFocus(true);
  }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }
  return (
    <form
      className={`search-form  ${stickyBar ? "search-form--stuck" : ""} ${
        focus ? "search-form--focused" : ""
      }`}
    >
      <input
        type="search"
        name="search"
        id="search-bar"
        placeholder={`Search ${categoriesActive ? "categories" : "bookmarks"}`}
        className="inputs"
        onFocus={(e) => beginSearch(e)}
        onBlur={(e) => setFocus(false)}
        onChange={(e) => handleSearch(e)}
        value={searchQuery}
      />
    </form>
  );
}
