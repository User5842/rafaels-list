import { LinearProgress } from "@mui/material";

import styles from "./Progress.module.css";

import useQuestionsStore from "../../store/store";

const Progress = () => {
  const {
    completed,
    data: { easy, medium, hard },
  } = useQuestionsStore();
  const total = easy.length + medium.length + hard.length;

  return (
    <section className={styles.progress}>
      <div className={styles.progress__count}>
        <p>
          <span>{easy.length}</span> easy
        </p>
        <p>
          <span>{medium.length}</span> medium
        </p>
        <p>
          <span>{hard.length}</span> hard
        </p>
        {"|"}
        <p>
          <span>Total: </span> {total}
        </p>
      </div>
      <LinearProgress
        role={"progressbar"}
        variant="determinate"
        value={(completed / total) * 100}
      />
    </section>
  );
};

export default Progress;
