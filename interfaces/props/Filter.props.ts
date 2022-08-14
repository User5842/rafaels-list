import { FormEvent } from "react";

export interface FilterProps {
  readonly onFilterChange: (_: FormEvent<HTMLElement>) => void;
  readonly topics: Array<string>;
}
