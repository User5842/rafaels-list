import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import Explore from "../components/Explore/Explore";
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
        <meta
          property="og:description"
          content="High-quality LeetCode questions with live-video links."
        />
        <meta property="og:image" content="🏖️" />
        <meta property="og:title" content="Rafael's List" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rafaelslist.com/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="High-quality LeetCode questions with live-video links."
        />
        <meta property="twitter:domain" content="rafaelslist.com" />
        <meta name="twitter:image" content="🏖️" />
        <meta name="twitter:title" content="Rafael's List" />
        <meta property="twitter:url" content="https://www.rafaelslist.com/" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏖️</text></svg>"
        />
      </Head>
      <main className={styles.main}>
        <Header />
        <section className={styles.text}>
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
          <p>
            I&apos;ve recently started doing front-end live streams under the
            name{" "}
            <a
              href="https://www.youtube.com/playlist?list=PLWzGjDEgHSJp9yBnacxIr10x8Sx59yJQI"
              rel="noopener noreferrer"
              target="_blank"
            >
              With Vanilla 🍦
            </a>{" "}
            where I take application ideas and implement them using vanilla JS.
            If that&apos;s something you&apos;re interested in, click the link
            or visit the repository on{" "}
            <a
              href="https://github.com/User5842/with-vanilla"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub.
            </a>{" "}
          </p>
          <p>
            If you&apos;re looking for more tailored videos of LeetCode
            questions based on the Explore cards,{" "}
            <span className="strong">click</span> on one of the playlists below.
          </p>
        </section>
        <section>
          <Explore />
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

  const data: Data = questions.reduce(
    (innerData, question) => {
      innerData[question.difficulty].push(question);
      return innerData;
    },
    {
      easy: [],
      medium: [],
      hard: [],
    } as Data
  );

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
