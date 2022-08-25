import { FunctionComponent } from "react";

import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";

const Search: FunctionComponent<SearchProps> = ({ onSearchChange }) => {
  return (
    <div className={styles.search}>
      <label htmlFor="search">Or Search:</label>
      <input
        className={styles.search__input}
        id="search"
        title="Search"
        type="text"
        onChange={onSearchChange}
      />
    </div>
  );
};

export default Search;
