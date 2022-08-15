import { get, off, on, remove, set } from "local-storage";

const localRemove = (key: string) => {
  remove(key);
  let completed = get("completed") as number;
  completed = completed - 1;
  set("completed", completed);
};

const localSet = (key: string, value: unknown) => {
  set(key, value);
  let completed = get("completed") as number;
  completed = completed + 1;
  set("completed", completed);
};

export const local = {
  get,
  off,
  on,
  remove: localRemove,
  set: localSet,
};
