import React, { createContext, FunctionComponent, useState } from "react";
import { Data } from "../interfaces/Data.interface";

export type ContextType = {
  data: Data | null;
  topics: Array<string>;
  setData: (_: Data, __?: string) => void;
  setTopics: (_: Array<string>) => void;
};

const DataContext = createContext<ContextType>({
  data: null,
  topics: [],
  setData: (_: Data) => {},
  setTopics: (_: Array<string>) => [],
});

export const DataContextProvider: FunctionComponent<{
  children: React.ReactNode;
}> = (props) => {
  const [data, setData] = useState<Data | null>(null);

  const [topics, setTopics] = useState<Array<string>>([]);

  const dataHandler = (newData: Data) => setData(newData);

  const topicsHandler = (newTopics: Array<string>) => setTopics(newTopics);

  return (
    <DataContext.Provider
      value={{
        data,
        topics,
        setData: dataHandler,
        setTopics: topicsHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
