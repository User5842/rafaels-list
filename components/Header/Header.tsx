import {
  faDiscord,
  faGithubAlt,
  faSpotify,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faShirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.header__heading}>Rafael&apos;s List</h1>
    <nav className={styles.header__nav}>
      <a
        href="https://github.com/User5842/rafaels-list"
        rel="noopener noreferrer"
        target="_blank"
        title="Github"
      >
        <FontAwesomeIcon
          color="white"
          icon={faGithubAlt}
          style={{ fontSize: "1.5rem" }}
        />
      </a>
      <a
        href="https://www.youtube.com/c/leetcodelive"
        rel="noopener noreferrer"
        target="_blank"
        title="YouTube"
      >
        <FontAwesomeIcon
          color="white"
          icon={faYoutube}
          style={{ fontSize: "1.5rem" }}
        />
      </a>
      <a
        href="https://discord.gg/B45J8HKNth"
        rel="noopener noreferrer"
        target="_blank"
        title="Discord"
      >
        <FontAwesomeIcon
          color="white"
          icon={faDiscord}
          style={{ fontSize: "1.5rem" }}
        />
      </a>
      <a
        href="https://open.spotify.com/show/01o0SmeDTnKQaeN6uZ9L8R"
        rel="noopener noreferrer"
        target="_blank"
        title="Spotify - castware"
      >
        <FontAwesomeIcon
          color="white"
          icon={faSpotify}
          style={{ fontSize: "1.5rem" }}
        />
      </a>
      <a
        href="https://livecoding.creator-spring.com"
        rel="noopener noreferrer"
        target="_blank"
        title="Spring"
      >
        <FontAwesomeIcon
          color="white"
          icon={faShirt}
          style={{ fontSize: "1.5rem" }}
        />
      </a>
    </nav>
  </header>
);

export default Header;
