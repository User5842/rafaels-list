import { initializeApp } from "firebase/app";
import { child, get, getDatabase, ref } from "firebase/database";

import { Data } from "../interfaces/Data.interface";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const databaseRef = ref(getDatabase(app));

let data: Data | null = null;
let topics: Set<string> = new Set();

export const getData = async () => {
  try {
    const snapshot = await get(child(databaseRef, "/"));

    if (snapshot.exists()) {
      data = snapshot.val();

      data.easy
        .flatMap((question) => question.topics)
        .forEach((topic) => topics.add(topic));

      return {
        data,
        topics,
        easyCount: data.easy.length,
      };
    } else {
      throw new Error("No data available.");
    }
  } catch (error) {
    console.error(error);
  }
};
