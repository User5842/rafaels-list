import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";

import Filter from "../components/Filter/Filter";
import Header from "../components/Header/Header";
import Intro from "../components/Intro/Intro";
import Progress from "../components/Progress/Progress";
import Questions from "../components/Questions/Questions";
import { Data } from "../interfaces/Data.interface";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ data: Data; topics: Array<string> }> = ({
  data,
  topics,
}) => {
  const [easyQuestions, setEasyQuestions] = useState(data.easy);

  const filterChange = (e: FormEvent<HTMLElement>) => {
    const target = e.target as HTMLSelectElement;
    const filter = target.value;
    setEasyQuestions(() =>
      filter.length > 0
        ? [...data.easy].filter((question) => question.topics.includes(filter))
        : data.easy
    );
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
        <Progress easyCount={easyQuestions.length} />
        <Filter topics={topics} onFilterChange={filterChange} />
        <Questions easy={easyQuestions} />
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const app = initializeApp({
    apiKey: process.env.API_KEY,
    appId: process.env.APP_ID,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    measurementId: process.env.MEASUREMENT_ID,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
  });

  const topics = new Set<string>();

  const databaseRef = ref(getDatabase(app));

  const snapshot = await get(child(databaseRef, "/"));

  if (snapshot.exists()) {
    const data = snapshot.val() as Data;
    data.easy
      .flatMap((question) => question.topics)
      .forEach((topic) => topics.add(topic));

    return {
      props: {
        data,
        topics: [...topics.values()],
      },
    };
  } else {
    throw new Error("No data available.");
  }
}

export default Home;
