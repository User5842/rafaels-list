import create from "zustand";
import { Data } from "../interfaces/Data.interface";
import * as ls from "local-storage";

interface DataState {
  completed: number;
  data: Data;
  topics: Array<string>;
  addToLocalStorage: (id: string) => void;
  markQuestionComplete: () => void;
  markQuestionIncomplete: () => void;
  removeFromLocalStorage: (id: string) => void;
  retrieveFromLocalStorage: (id: string) => boolean | null;
  setData: (newData: Data) => void;
  setTopics: (newTopics: Array<string>) => void;
}

const useQuestionsStore = create<DataState>()((set) => ({
  completed: 0,
  data: { easy: [], medium: [], hard: [] },
  topics: [],
  addToLocalStorage: (id) => ls.set(id, true),
  markQuestionComplete: () =>
    set((state) => ({ completed: state.completed + 1 })),
  markQuestionIncomplete: () =>
    set((state) => ({ completed: state.completed - 1 })),
  removeFromLocalStorage: (id) => ls.remove(id),
  retrieveFromLocalStorage: (id) => ls.get(id),
  setData: (newData) => set(() => ({ data: { ...newData } })),
  setTopics: (newTopics) => set(() => ({ topics: newTopics })),
}));

export default useQuestionsStore;
