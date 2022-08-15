import Head from "next/head";
import { FormEvent, useContext } from "react";

import styles from "./Main.module.css";

import DataContext from "../../store/store";
import Filter from "../Filter/Filter";
import Header from "../Header/Header";
import Intro from "../Intro/Intro";
import Progress from "../Progress/Progress";
import Questions from "../Questions/Questions";

const Main = () => {
  const context = useContext(DataContext);

  const filterChange = (e: FormEvent<HTMLElement>) => {
    const target = e.target as HTMLSelectElement;
    const filter = target.value;

    if (context.data && context.data.easy) {
      const filteredQuestions =
        filter.length > 0
          ? [...context.data.easy].filter((question) =>
              question.topics.includes(filter)
            )
          : context.data.easy;
      context.setEasyQuestions(filteredQuestions);
    }
  };

  return (
    <>
      <Head>
        <title>Rafael&apos;s List</title>
        <meta
          name="description"
          content="High-quality LeetCode questions with live-video links."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <Intro />
        <Progress easyCount={context.data?.easy.length} />
        <Filter onFilterChange={filterChange} />
        <Questions easy={context.easyQuestions} />
      </main>
    </>
  );
};

export default Main;
