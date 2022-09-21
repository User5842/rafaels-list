import styles from "./Questions.module.css";

import useQuestionsStore from "../../store/store";
import Question from "../Question/Question";

const Questions = () => {
  const { data } = useQuestionsStore();

  return (
    <section>
      <details className={styles.question_details}>
        <summary className={styles.questions_difficulty}>Easy</summary>
        <ul className={styles.questions}>
          {data.easy &&
            data.easy.map((question) => (
              <Question key={question.id} {...question} />
            ))}
        </ul>
      </details>
      <details className={styles.question_details}>
        <summary className={styles.questions_difficulty}>Medium</summary>
        <ul className={styles.questions}>
          {data.medium &&
            data.medium.map((question) => (
              <Question key={question.id} {...question} />
            ))}
        </ul>
      </details>
    </section>
  );
};

export default Questions;
