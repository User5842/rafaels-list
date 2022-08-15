import { LinearProgress } from "@mui/material";
import { FunctionComponent, useContext, useEffect, useState } from "react";

import styles from "./Progress.module.css";

import { ProgressProps } from "../../interfaces/props/Progress.props";
import DataContext from "../../store/store";

const Progress: FunctionComponent<ProgressProps> = ({
  easyCount = 0,
  mediumCount = 0,
  hardCount = 0,
}) => {
  const context = useContext(DataContext);
  const [completed, setCompleted] = useState(context.completed);
  const total = easyCount + mediumCount + hardCount;

  useEffect(() => setCompleted(context.completed), [context.completed]);

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
      <LinearProgress variant="determinate" value={(completed / total) * 100} />
    </section>
  );
};

export default Progress;
