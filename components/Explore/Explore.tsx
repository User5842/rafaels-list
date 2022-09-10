import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Explore.module.css";

const Explore = () => {
  return (
    <div className={styles.explore}>
      <a
        className={styles.explore__card}
        href="https://www.youtube.com/playlist?list=PLWzGjDEgHSJqVdC3OG_vo-3ktp69BnL-x"
        rel="noopener noreferrer"
        target="_blank"
        title="LeetCode Beginner's Guide"
      >
        <FontAwesomeIcon
          color="white"
          icon={faMagnifyingGlass}
          style={{ fontSize: "2rem" }}
        />
        <h1>LeetCode Beginner&apos;s Guide</h1>
      </a>
      <div className={styles.explore__card}>
        <h1>Coming soon...</h1>
      </div>
    </div>
  );
};

export default Explore;
