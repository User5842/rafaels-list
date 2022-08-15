import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";
import type { NextPage } from "next";
import { useContext, useEffect } from "react";

import Main from "../components/Main/Main";
import { Data } from "../interfaces/Data.interface";
import { local } from "../store/local";
import DataContext from "../store/store";

const Home: NextPage<{ data: Data; topics: Array<string> }> = ({
  data,
  topics,
}) => {
  const context = useContext(DataContext);

  useEffect(() => {
    context.setCompleted(local.get("completed"));
    context.setData(data);
    context.setEasyQuestions(data.easy);
    context.setTopics(topics);
  }, []);

  return <Main />;
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
