import { FunctionComponent } from "react";
import { ProgressProps } from "../../interfaces/props/Progress.props";
import styles from "./Progress.module.css";

const Progress: FunctionComponent<ProgressProps> = ({
  easyCount,
  mediumCount = 0,
  hardCount = 0,
}) => {
  return (
    <section className={styles.progress}>
      <div className={styles.progress__count}>
        <p>
          <span>{easyCount}</span> easy
        </p>
        <p>
          <span>{mediumCount}</span> medium
        </p>
        <p>
          <span>{hardCount}</span> hard
        </p>
        {"|"}
        <p>
          <span>Total: </span> {easyCount + mediumCount + hardCount}
        </p>
      </div>
    </section>
  );
};

export default Progress;
