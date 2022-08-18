import { FunctionComponent } from "react";

import styles from "./Filter.module.css";
import { FilterProps } from "./Filter.props";

import useQuestionsStore from "../../store/store";

const Filter: FunctionComponent<FilterProps> = ({ onFilterChange }) => {
  const { topics } = useQuestionsStore();

  return (
    <section className={styles.filter} onChange={onFilterChange}>
      <label htmlFor="topics">Choose a topic:</label>

      <select className={styles.topics} name="topics" id="topics">
        <option value="">--Please choose a topic--</option>
        {topics &&
          topics.map((topic: string, index) => (
            <option key={index} value={topic}>
              {topic}
            </option>
          ))}
      </select>
    </section>
  );
};

export default Filter;
