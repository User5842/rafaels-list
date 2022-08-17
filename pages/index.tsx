import type { NextPage } from "next";
import { useContext, useEffect } from "react";

import Main from "../components/Main/Main";
import { Data } from "../interfaces/Data.interface";
import prisma from "../lib/prisma";
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
  const questions = await prisma.question.findMany();

  const data: Data = {
    easy: questions,
  };

  const allTopics = questions.flatMap((question) => question.topics);
  const uniqueTopics = [...new Set(allTopics)];

  return {
    props: {
      data,
      uniqueTopics,
    },
  };
}

export default Home;
