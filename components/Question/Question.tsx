import { FunctionComponent, useEffect, useState } from "react";

import styles from "./Question.module.css";

import { Question as QuestionInterface } from "../../interfaces/Question.interface";
import { local } from "../../store/local";

const Question: FunctionComponent<QuestionInterface> = ({
  id,
  link,
  name,
  topics,
  video,
}) => {
  const [completed, setCompleted] = useState(false);

  const questionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName !== "LI") return;
    const className = `${styles["list__question-complete"]}`;

    if (target.classList.contains(className)) {
      target.classList.remove(className);
      local.remove(id);
    } else {
      target.classList.add(className);
      local.set(id, true);
    }
  };

  useEffect(() => {
    if (local.get(id)) setCompleted(true);
  }, [id]);

  return (
    <li
      className={`${styles.list__question} ${
        completed ? styles["list__question-complete"] : ""
      }`}
      onClick={questionClick}
    >
      <h3>{name}</h3>
      <div className={styles.list__meta}>
        <a
          className={styles.list__link}
          href={video}
          rel="noopener noreferrer"
          target="_blank"
          title="YouTube Stream Clip"
        >
          Stream Clip
        </a>
        <a
          className={styles.list__link}
          href={link}
          rel="noopener noreferrer"
          target="_blank"
          title="LeetCode Question"
        >
          LeetCode Question
        </a>
        <details className={styles.list__details}>
          <summary>Topics</summary>
          {topics.map((topic, index) => (
            <p key={index}>{topic}</p>
          ))}
        </details>
      </div>
    </li>
  );
};

export default Question;
