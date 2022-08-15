import { FunctionComponent } from "react";

import styles from "./Questions.module.css";

import { Question as QuestionInterface } from "../../interfaces/Question.interface";
import Question from "../Question/Question";

const Questions: FunctionComponent<{
  easy: Array<QuestionInterface> | undefined;
}> = ({ easy }) => {
  return (
    <section>
      <details>
        <summary className={styles.questions_difficulty}>Easy</summary>
        <ul className={styles.questions}>
          {easy &&
            easy.map((question) => (
              <Question key={question.id} {...question} />
            ))}
        </ul>
      </details>
    </section>
  );
};

export default Questions;
