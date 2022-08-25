import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import Filter from "../components/Filter/Filter";
import Header from "../components/Header/Header";
import Progress from "../components/Progress/Progress";
import Questions from "../components/Questions/Questions";
import Search from "../components/Search/Search";
import { Data } from "../interfaces/Data.interface";
import prisma from "../lib/prisma";
import useQuestionsStore from "../store/store";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ data: Data; topics: Array<string> }> = ({
  data,
  topics,
}) => {
  const { setData, setTopics, setTotal } = useQuestionsStore();

  useEffect(() => {
    setData(data);
    setTopics(topics);
    setTotal(data.easy.length + data.medium.length + data.hard.length);
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

  const searchChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    let searchedData = { ...data };

    searchedData = {
      ...searchedData,
      easy: [...data.easy].filter((question) =>
        question.name.toLowerCase().includes(value.toLowerCase())
      ),
    };

    setData(searchedData);
  };

  return (
    <>
      <Head>
        <title>Rafael&apos;s List</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="High-quality LeetCode questions with live-video links."
        />
        <meta property="og:title" content="Rafael's List" />
        <meta property="og:type" content="list.rafael" />
        <meta property="og:url" content="https://www.rafaelslist.com" />
        <meta property="og:image" content="/favicon.ico" />
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
        <div className={styles.controls}>
          <Filter onFilterChange={filterChange} />
          <Search onSearchChange={searchChange} />
        </div>
        <Questions />
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
