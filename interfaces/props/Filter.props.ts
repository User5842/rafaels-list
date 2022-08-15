import { FormEvent } from "react";

/**
 * Represents props for the `Filter` component.
 */
export interface FilterProps {
  /**
   * Handler for the filter change event.
   */
  readonly onFilterChange: (_: FormEvent<HTMLElement>) => void;
}
