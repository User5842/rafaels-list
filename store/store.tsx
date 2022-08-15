import React, { createContext, FunctionComponent, useState } from "react";
import { Data } from "../interfaces/Data.interface";
import { Question } from "../interfaces/Question.interface";

export type ContextType = {
  completed: number;
  data: Data | null;
  easyQuestions: Array<Question>;
  topics: Array<string>;
  setCompleted: (_: number) => void;
  setData: (_: Data, __?: string) => void;
  setEasyQuestions: (_: Array<Question>) => void;
  setTopics: (_: Array<string>) => void;
};

const DataContext = createContext<ContextType>({
  completed: 0,
  data: null,
  easyQuestions: [],
  topics: [],
  setCompleted: (_: number) => 0,
  setData: (_: Data) => {},
  setEasyQuestions: (_: Array<Question>) => {},
  setTopics: (_: Array<string>) => [],
});

export const DataContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = (props) => {
  const [completed, setCompleted] = useState(0);

  const [data, setData] = useState<Data | null>(null);

  const [easyQuestions, setEasyQuestions] = useState<Array<Question>>([]);

  const [topics, setTopics] = useState<Array<string>>([]);

  const completedHandler = (newCompleted: number) => setCompleted(newCompleted);

  const dataHandler = (newData: Data) => setData(newData);

  const easyQuestionsHandler = (newEasyQuestions: Array<Question>) =>
    setEasyQuestions(newEasyQuestions);

  const topicsHandler = (newTopics: Array<string>) => setTopics(newTopics);

  return (
    <DataContext.Provider
      value={{
        completed,
        data,
        easyQuestions,
        topics,
        setCompleted: completedHandler,
        setData: dataHandler,
        setEasyQuestions: easyQuestionsHandler,
        setTopics: topicsHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
