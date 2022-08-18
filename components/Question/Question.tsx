import React, { FunctionComponent, useEffect, useState } from "react";

import styles from "./Question.module.css";

import { Question as QuestionInterface } from "../../interfaces/Question.interface";
import useQuestionsStore from "../../store/store";

const Question: FunctionComponent<QuestionInterface> = ({
  id,
  link,
  name,
  topics,
  video,
}) => {
  const {
    addToLocalStorage,
    removeFromLocalStorage,
    markQuestionComplete,
    markQuestionIncomplete,
    retrieveFromLocalStorage,
  } = useQuestionsStore();

  let didInit = false;

  const [questionComplete, setQuestionComplete] = useState<boolean | null>();

  const questionClick = () => {
    if (questionComplete) {
      markQuestionIncomplete();
      removeFromLocalStorage(id);
      setQuestionComplete(false);
    } else {
      markQuestionComplete();
      addToLocalStorage(id);
      setQuestionComplete(true);
    }
  };

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      if (retrieveFromLocalStorage(id)) {
        markQuestionComplete();
        setQuestionComplete(true);
      }
    }
  }, [id]);

  return (
    <li
      className={`${styles.question} ${
        questionComplete ? styles.question__complete : ""
      }`}
    >
      <div className={styles.question__data}>
        <h3>{name}</h3>
        <div className={styles.question__meta}>
          <a
            className={styles.question__link}
            href={video}
            rel="noopener noreferrer"
            target="_blank"
            title="YouTube Stream Clip"
          >
            Stream Clip
          </a>
          <a
            className={styles.question__link}
            href={link}
            rel="noopener noreferrer"
            target="_blank"
            title="LeetCode Question"
          >
            LeetCode Question
          </a>
          <details className={styles.question__details}>
            <summary>Topics</summary>
            {topics.map((topic, index) => (
              <p key={index}>{topic}</p>
            ))}
          </details>
        </div>
      </div>
      <span className={styles.question__button} onClick={questionClick}>
        ✅
      </span>
    </li>
  );
};

export default Question;
