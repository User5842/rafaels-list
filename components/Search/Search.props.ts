/**
 * Represents props for the `Search` component.
 */
export interface SearchProps {
  /**
   * Handler for the search input-change event.
   */
  readonly onSearchChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
}
