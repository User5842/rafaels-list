import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import Filter from "../components/Filter/Filter";
import Header from "../components/Header/Header";
import Progress from "../components/Progress/Progress";
import Questions from "../components/Questions/Questions";
import { Data } from "../interfaces/Data.interface";
import prisma from "../lib/prisma";
import useQuestionsStore from "../store/store";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ data: Data; topics: Array<string> }> = ({
  data,
  topics,
}) => {
  const { setData, setTopics } = useQuestionsStore();

  useEffect(() => {
    setData(data);
    setTopics(topics);
  }, []);

  const filterChange = ({
    target: { value: filter },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    let filteredData = { ...data };

    if (filter.length > 0) {
      filteredData = {
        ...filteredData,
        easy: [...data.easy].filter((question) =>
          question.topics.includes(filter)
        ),
      };
    }

    setData(filteredData);
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
        <section>
          <p>
            Here&apos;s a list of questions I came up with while{" "}
            <a
              href="https://www.youtube.com/playlist?list=PLWzGjDEgHSJrDEUbJxp1J9KFyYg4G4l9Y"
              rel="noopener noreferrer"
              target="_blank"
            >
              streaming myself doing every single question on LeetCode
            </a>
            . Each question links to a part in a stream where I talk about the
            problem. My intent is not to necessarily teach you how to solve
            these questions (there are plenty of resources for that), but
            rather, to give you a raw look into my thought process. You&apos;ll
            watch me make mistakes, hear me struggle and hopefully develop an
            optimized algorithm by the end.
          </p>
        </section>
        <Progress />
        <Filter onFilterChange={filterChange} />
        <Questions easy={data.easy} />
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const questions = await prisma.question.findMany();

  const data: Data = {
    easy: questions,
    medium: [],
    hard: [],
  };

  const allTopics = questions.flatMap((question) => question.topics);
  const uniqueTopics = [...new Set(allTopics)];

  return {
    props: {
      data,
      topics: uniqueTopics,
    },
  };
}

export default Home;
