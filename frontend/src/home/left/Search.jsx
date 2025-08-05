import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <form>
      <label className="input input-bordered flex items-center gap-2 w-full bg-base-300">
        <input
          type="text"
          className="grow bg-transparent"
          placeholder="Search"
        />
        <FaSearch />
      </label>
    </form>
  );
};

export default Search;
