import React, { useEffect, useContext } from "react";
import { SearchContext } from "../../helpers/Context";
import { useNavigate } from "react-router-dom";

type Props = {
  categoriesActive: boolean;
};
export default function SearchBar({ categoriesActive }: Props) {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  useEffect(() => {}, []);
  function search(e: React.FocusEvent<HTMLInputElement>) {
    navigate(
      {
        search: `?search=${categoriesActive ? "categories" : "bookmarks"}`,
      },
      { replace: false }
    );
  }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }
  return (
    <form className="flex h-14 items-center lg:w-7/12">
      <input
        type="search"
        name="search"
        id="search-bar"
        placeholder={`Search ${categoriesActive ? "categories" : "bookmarks"}`}
        className="inputs"
        onFocus={(e) => search(e)}
        onChange={(e) => handleSearch(e)}
        value={searchQuery}
      />
    </form>
  );
}
